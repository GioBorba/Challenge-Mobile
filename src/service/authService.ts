import api from './api';

export const cadastrarUsuario = async (nome: string, email: string, senha: string) => {
  try {
    const response = await api.post('/auth/cadastrar', { nome, email, senha });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Erro ao cadastrar usuário');
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
    const message = error?.response?.data?.message || 'Erro ao fazer login';
    console.error('Erro ao fazer login:', message);
    throw new Error(message);
  }
};
