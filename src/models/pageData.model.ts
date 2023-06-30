export interface IWorkSection {
    type: string;
    description?: string;
    coverImage: string;
    images: string[];
}

export interface IExpoSection {
    location: string;
    startDate: string;
    endDate: string;
    coverImage: string;
    images: string[];
}

export interface IPageSectionContent {
    title: string;
    subTitle?: string;
}

export interface IPageSectionDefault {
    type: 'default';
    pinned: boolean;
    fullWidth: boolean;
    theme: 'dark' | 'light';
    content: IPageSectionContent & {
        body: string[];
    };
}

export interface IPageSectionWork {
    type: 'work';
    pinned: boolean;
    fullWidth: boolean;
    theme: 'dark' | 'light';
    content: IPageSectionContent & {
        body: IWorkSection[];
    };
}

export interface IPageSectionExpo {
    type: 'expo';
    pinned: boolean;
    fullWidth: boolean;
    theme: 'dark' | 'light';
    content: IPageSectionContent & {
        body: IExpoSection[];
    };
}

export type IPageSection = IPageSectionDefault | IPageSectionWork | IPageSectionExpo;

export interface IPageData {
    hasHero: boolean;
    heroImagePath?: string;
    pageTitle: string;
    pageSections: Array<IPageSection>;
}
