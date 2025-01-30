import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindOneOptions, Raw } from "typeorm"; // Import FindOneOptions
import { ShortenedUrlManagement } from "./entities/shortened-url-management.entity";
import { AnyARecord } from "dns";

@Injectable()
export class ShortenedUrlManagementService {
    protected readonly URL_BASE  = 'https://short.ly/';
    constructor(
        @InjectRepository(ShortenedUrlManagement)
        private shortenedUrlRepository: Repository<ShortenedUrlManagement>,
    ) {}

    /**
     * Creates a new shortened URL for the given original URL.
     *
     * @param originalUrl - The original URL to be shortened.
     * @returns A Promise that resolves to the newly created ShortenedUrlManagement entity.
     * @throws Will throw an error if the original URL is not provided.
     */
    async createShortenedUrl(originalUrl: string): Promise<Object> {
        const shortenedUrl = this.shortenedUrlRepository.create({
            originalUrl,
            shortenedUrl: this.generateShortenedUrl(),
        });
        const result =  await this.shortenedUrlRepository.save(shortenedUrl)
        return await this.mapPostResultToResponse(result);
    }

    /**
     * Generates a shortened URL of a specified length using a random combination of alphanumeric characters.
     *
     * @returns A string representing the generated shortened URL.
     */
    private generateShortenedUrl(): string {
        const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const desiredLength = 6; 

        let shortenedUrl = '';
        for (let i = 0; i < desiredLength; i++) {
            const randomIndex = Math.floor(Math.random() * ALPHABET.length);
            shortenedUrl += ALPHABET.charAt(randomIndex);
        }

        return shortenedUrl;
    }

    /**
     * Retrieves the original URL associated with the given shortened URL.
     *
     * @param shortenedUrl - The shortened URL to be redirected.
     * @returns A Promise that resolves to the original URL if found, or throws an error if not found.
     * @throws Will throw an HttpException with a status of NOT_FOUND if the shortened URL is not found in the database.
     */
    async redirectToOriginalUrl(shortenedUrl: string): Promise<Object> {

        const allUrls = await this.shortenedUrlRepository.find();
        console.log(allUrls);

        const foundUrl = await this.shortenedUrlRepository.findOneBy({shortenedUrl});

        console.log(foundUrl);
        if (!foundUrl) {
            throw new HttpException('Shortened URL not found', HttpStatus.NOT_FOUND);
        }
        return {originalUrl:foundUrl.originalUrl};
    }

    /**
 * Maps the result of a shortened URL creation to a response object
    * @param result - The ShortenedUrlManagement entity representing the newly created shortened URL.
    * @returns A Promise that resolves to an Object containing the original URL and the shortened URL.
    *
    * @throws Will not throw any exceptions./
    */
    private async mapPostResultToResponse(result:ShortenedUrlManagement): Promise<Object> {
        return {originalUrl:result.originalUrl,
        shortenedUrl: this.URL_BASE + result.shortenedUrl};
    }
}