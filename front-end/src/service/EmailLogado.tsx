import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode"; // Note o import correto: { jwtDecode }

type JwtPayload = {
  email: string;
  sub: string;
  exp: number;
};

function UserEmail() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    
    const token = localStorage.getItem('token');

    if (token) {
      try {
        
        const decodedToken = jwtDecode<JwtPayload>(token);
        
        
        setUserEmail(decodedToken.email); // Veja a estrutura no console
       
      } catch (error) {
        console.error("Token inválido", error);
      }
    }
  }, []);

  return (
     userEmail
  );
}

export default UserEmail;