import {Category} from "./Category.ts";

export interface Card {
    id: string;
    category: Category;
    question: string;
    answer: string;
    tag: string;
}