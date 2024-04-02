export interface Todo {
  id: string;
  status: boolean;
  Title: string;
  color?: string;
  priority?: 'low' | 'medium' | 'high';
  description?: string;
  image?: string;
  link?: string;
  subTodo?: SubTodo[];
}

export interface SubTodo {
  id: string;
  title: string;
  status: boolean;
  priority?: 'low' | 'medium' | 'high';
}

export interface List {
  id: string;
  title: string;
  todos: Todo[];
}
