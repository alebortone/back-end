import { IsBoolean, IsDate, IsEmail, IsOptional, IsString } from "class-validator"

export class CreateUserDto {
    
    id:number
    
    @IsString()
    name:string 

    @IsEmail()
    email:string

    @IsBoolean()
    isActive:boolean
    
    
    createdAt:Date


}
