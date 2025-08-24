import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  Req
} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {ApiTags, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {PostEntity} from "../database/typeorm/entities/post.entity";
import {Request} from "express";
import * as path from "path";

@ApiTags("Posts")
@Controller("posts")
export class PostController {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>
  ) {}

  // 📌 Listar todos os posts
  @ApiOperation({summary: "Listar todos os posts"})
  @Get()
  async index(@Req() req: Request) {
    const posts = await this.postRepository.find();
    return posts.map((post) => ({
      ...post,
      image_url: post.image
        ? `${req.protocol}://${req.get("host")}/files/${post.image}`
        : null
    }));
  }

  // 📌 Criar um post com upload de imagem
  @ApiOperation({summary: "Criar um novo post"})
  @ApiResponse({status: 201, description: "Post criado com sucesso"})
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./files",
        filename: (req, file, callback) => {
          const fileExt = path.extname(file.originalname);
          const fileName = `${Date.now()}${fileExt}`;
          callback(null, fileName);
        }
      }),
      limits: {fileSize: 8 * 1024 * 1024}, // 8MB
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.startsWith("image/")) {
          return callback(
            new BadRequestException("Somente imagens são permitidas!"),
            false
          );
        }
        callback(null, true);
      }
    })
  )
  @Post()
  async store(
    @Body() data: any,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request
  ) {
    try {
      if (!file) {
        throw new BadRequestException("É necessário enviar uma imagem!");
      }

      const post = this.postRepository.create({
        ...data,
        image: file.filename
      });

      await this.postRepository.save(post);

      return {
        ...post,
        image_url: `${req.protocol}://${req.get("host")}/files/${file.filename}`
      };
    } catch (error) {
      throw new InternalServerErrorException("Erro ao salvar o post!");
    }
  }

  // 📌 Buscar post por ID
  @ApiOperation({summary: "Buscar um post por ID"})
  @Get(":id")
  async show(@Param("id") id: number, @Req() req: Request) {
    const post = await this.postRepository.findOne({where: {id}});
    if (!post) {
      throw new NotFoundException("Post não encontrado");
    }

    return {
      ...post,
      image_url: post.image
        ? `${req.protocol}://${req.get("host")}/files/${post.image}`
        : null
    };
  }

  // 📌 Atualizar um post
  @ApiOperation({summary: "Atualizar um post existente"})
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./files",
        filename: (req, file, callback) => {
          const fileExt = path.extname(file.originalname);
          const fileName = `${Date.now()}${fileExt}`;
          callback(null, fileName);
        }
      }),
      limits: {fileSize: 8 * 1024 * 1024},
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.startsWith("image/")) {
          return callback(
            new BadRequestException("Somente imagens são permitidas!"),
            false
          );
        }
        callback(null, true);
      }
    })
  )
  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() data: any,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request
  ) {
    const post = await this.postRepository.findOne({where: {id}});
    if (!post) {
      throw new NotFoundException("Post não encontrado");
    }

    if (file) {
      data.image = file.filename;
    }

    Object.assign(post, data);
    await this.postRepository.save(post);

    return {
      ...post,
      image_url: post.image
        ? `${req.protocol}://${req.get("host")}/files/${post.image}`
        : null
    };
  }

  // 📌 Deletar um post
  @ApiOperation({summary: "Deletar um post"})
  @Delete(":id")
  async destroy(@Param("id") id: number) {
    const post = await this.postRepository.findOne({where: {id}});
    if (!post) {
      throw new NotFoundException("Post não encontrado");
    }

    await this.postRepository.remove(post);
    return {message: "Post deletado com sucesso!"};
  }
}
