export type Actuality = { 
    id: number;  
    date: string; 
    title: string; 
    content: string; 
    image: {
        url: string;
        alternativeText?: string;
    };
}

export type Service = {
    id: number;
    title: string;
    image: {
        url: string;
        alternativeText?: string;
    }[];
};

export type HomeContent = {
  title: string;
  subtitle: string;
  heroImage: {
    url: string;
  };
  ctaText: string;
  ctaLink: string;
}
