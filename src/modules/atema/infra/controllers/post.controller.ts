import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  Req,
  Body
} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ApiTags, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {PostEntity} from "../database/typeorm/entities/post.entity";
import * as path from "path";
import {FastifyRequest} from "fastify";
import fs from "fs/promises";

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
  async index() {
    const posts = await this.postRepository.find();
    return posts.map((post) => ({
      ...post,
      image: post.image
        ? post.image
        : "https://atema.net.br/static/illustrations/atema.jpg"
    }));
  }

  // 📌 Criar um post com upload de imagem
  @ApiOperation({summary: "Criar uma nova imagem"})
  @ApiResponse({status: 201, description: "Imagem criada com sucesso"})
  @Post("file")
  async store(@Req() req: FastifyRequest) {
    try {
      const data = await req.file();

      if (!data) {
        throw new BadRequestException("É necessário enviar uma imagem!");
      }

      const buffer = await data.toBuffer();
      const fileExt = path.extname(data.filename);
      const fileName = `${Date.now()}${fileExt}`;
      const filePath = `./files/${fileName}`;

      const fs = await import("fs/promises");
      await fs.writeFile(filePath, buffer);

      return {
        image: `${req.protocol}://${req.hostname}/files/${fileName}`
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Erro ao salvar o post!");
    }
  }

  @ApiOperation({summary: "Criar um post"})
  @ApiResponse({status: 201, description: "Post criado com sucesso"})
  @Post()
  async storePost(@Body() data: any) {
    const post = this.postRepository.create(data);
    await this.postRepository.save(post);
    return post;
  }

  // 📌 Buscar post por ID
  @ApiOperation({summary: "Buscar um post por ID"})
  @Get(":id")
  async show(@Param("id") id: number) {
    const post = await this.postRepository.findOne({where: {id}});
    if (!post) {
      throw new NotFoundException("Post não encontrado");
    }

    return {
      ...post,
      image: post.image
        ? post.image
        : "https://atema.net.br/static/illustrations/atema.jpg"
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

    // delete image file if exists
    if (post.image) {
      try {
        // Pega somente o nome do arquivo da URL
        const fileName = path.basename(post.image);

        // Caminho absoluto da pasta /files na raiz do projeto
        const filePath = path.resolve(
          __dirname,
          "../../../../../../files",
          fileName
        );

        // Deleta o arquivo
        await fs.unlink(filePath);
        console.log("Imagem deletada com sucesso:", filePath);
      } catch (error) {
        console.warn("Não foi possível deletar a imagem:", error);
      }
    }

    return {message: "Post deletado com sucesso!"};
  }
}
