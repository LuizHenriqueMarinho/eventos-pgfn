import { Categorias } from "src/app/shared/models/Categorias";

export interface Eventos {
  id: number;
  nome: string;
  descricao: string;
  local: string;
  data: string;
  detalhes: string;
  categoria: Categorias;
  createdAt: string;
  updatedAt: string;
};
