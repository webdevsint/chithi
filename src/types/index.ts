export type Category = 'Classic' | 'Family' | 'Partners' | 'Friends' | 'Anime';

export interface Template {
  front: string;
  back: string;
  textColor: string;
  shareFront: string;
  shareBack: string;
}

export interface TemplatesMap {
  [key: number]: Template;
}

export interface CategoryInfo {
  name: Category;
  templates: number[];
}

export interface CardData {
  to: string;
  from: string;
  message: string;
}
