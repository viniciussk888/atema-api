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
import {supabase} from "../../../../common/supabase.client";

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
      // Receber o arquivo enviado
      const file = await req.file();

      if (!file) {
        throw new BadRequestException("É necessário enviar uma imagem!");
      }

      // Converter para buffer
      const buffer = await file.toBuffer();

      // Criar nome único para a imagem
      const fileExt = path.extname(file.filename);
      const fileName = `${Date.now()}${fileExt}`;

      // Enviar para o bucket 'atema'
      const {error: uploadError} = await supabase.storage
        .from("atema")
        .upload(fileName, buffer, {
          contentType: file.mimetype
        });

      if (uploadError) {
        console.error(uploadError);
        throw new InternalServerErrorException(
          "Erro ao enviar a imagem para o Supabase!"
        );
      }

      // Gerar URL pública (assumindo que o bucket é público)
      const {data} = supabase.storage.from("atema").getPublicUrl(fileName);

      if (data.publicUrl === null) {
        throw new InternalServerErrorException(
          "Erro ao gerar a URL da imagem!"
        );
      }

      return {
        image: data.publicUrl
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Erro ao salvar a imagem!");
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
        //delete from supabase
        const imageName = post.image.split("/").pop();
        if (imageName) {
          const {error} = await supabase.storage
            .from("atema")
            .remove([imageName]);
          if (error) {
            console.error(
              "Não foi possível deletar a imagem do Supabase:",
              error
            );
          }
        }
      } catch (error) {
        console.warn("Não foi possível deletar a imagem:", error);
      }
    }

    return {message: "Post deletado com sucesso!"};
  }
}
