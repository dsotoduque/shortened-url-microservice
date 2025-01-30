import { Controller, Post, Body, Get, Query, Header } from '@nestjs/common';
import { ShortenedUrlManagementService } from './shortened-url-management.service';
import { CreateShortenedUrlDto } from './dto/create-shortened-url.dto';
import { ShortenedUrlManagement } from './entities/shortened-url-management.entity';
import { GetRedirectUrlDto } from './dto/get-redirect-url.dto';

@Controller('shortened-url-management')
export class ShortenedUrlManagementController {
  constructor(
    private readonly shortenedUrlManagementService: ShortenedUrlManagementService,
  ) {}

  /**
   * Creates a shortened URL from the given original URL.
   *
   * @param createShortenedUrlDto - The DTO containing the original URL to be shortened.
   * @returns A Promise that resolves to the newly created ShortenedUrlManagement entity.
   */
  @Post('shorten')
  async createShortenedUrl(@Body() createShortenedUrlDto: CreateShortenedUrlDto): Promise<Object> {
    return await this.shortenedUrlManagementService.createShortenedUrl(createShortenedUrlDto.originalUrl);
  }

  /**
   * Retrieves the original URL associated with the given shortened URL and redirects the user to it.
   *
   * @param shortenedUrl - The shortened URL to be redirected. This is expected to be a query parameter.
   * @returns A Promise that resolves to the original URL as a string.
   *          If the shortened URL is not found in the database, the Promise will reject with an error.
   */
  @Get('get-redirect')
  async redirectToOriginalUrl(@Query() queryParams: { shortenedUrl: string }): Promise<Object> {
    console.log(queryParams.shortenedUrl);
    return await this.shortenedUrlManagementService.redirectToOriginalUrl(queryParams.shortenedUrl);
  }
}
