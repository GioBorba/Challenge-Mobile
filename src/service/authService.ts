import api from './api';

export const cadastrarUsuario = async (nome: string, email: string, senha: string) => {
  try {
    const response = await api.post('/auth/cadastrar', {
      nome,
      email,
      senha,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Erro ao cadastrar usuário';
  }
};



interface LoginRequest {
  email: string;
  senha: string;
}

interface LoginResponseDTO {
  id: string;
  nome: string;
  email: string;
}

export const login = async (credentials: LoginRequest): Promise<LoginResponseDTO> => {
  try {
    const response = await api.post<LoginResponseDTO>('/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    
    if (error.response?.data) {
      throw new Error(error.response.data);
    }
    throw new Error('Erro ao fazer login');
  }
};

