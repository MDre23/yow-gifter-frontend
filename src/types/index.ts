export interface Product {
    [x: string]: string;
    id: string;
    title: string;
    description: string;
    category: string;
    location: string;
    image: string;
    imageAlt: string;
  }
  
  export interface Category {
    id: string;
    name: string;
    subtitle: string;
    count: string;
    icon: string;
    href: string;
  }