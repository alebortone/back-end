import { IsBoolean, IsDate, IsEmail, IsOptional, IsString } from "class-validator"

export class CreateUserDto {
    

    
    @IsString()
    name:string 

    @IsEmail()
    email:string

    @IsBoolean()
    isActive:boolean
    
    
    


}
