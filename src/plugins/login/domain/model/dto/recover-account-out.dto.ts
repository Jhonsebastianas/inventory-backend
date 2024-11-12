import { ApiProperty } from "@nestjs/swagger";

export class RecoverAccountOutDTO {
    @ApiProperty({ description: 'token', example: 'eyJhbGciOiJIUzI1NiJ9.NjZmNWZkODI4NDBkM2QzOWJiOWU3NzZl.JzO_0ZkaHCcaVMaz6dzBg5AXwQWgPzY7pvxTz0RQAUQ' })
    token: string;

    @ApiProperty({ description: 'Usuario o correo electrónico', example: 'user@example.com' })
    email: string;

    @ApiProperty({ description: 'Código de verificación', example: '1234' })
    code: string;
}