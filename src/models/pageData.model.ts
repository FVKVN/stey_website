export interface IWorkSection {
    type: string;
    description?: string;
    coverImage: string;
    images: string[];
}

export interface IExpoSectionDefault {
    location: string;
    startDate: string;
    endDate: string;
    coverImage: string;
    images: string[];
}

export interface IExpoSection {
    upcoming: [] | IExpoSectionDefault[];
    past: [] | IExpoSectionDefault[];
}

export interface IPageSectionContent {
    title: string;
    subTitle?: string;
}

export interface IPageSectionDefault extends IPageSectionGeneric {
    type: 'default';
    content: IPageSectionContent & {
        body: string[];
    };
}

export interface IPageSectionWork extends IPageSectionGeneric {
    type: 'work';
    content: IPageSectionContent & {
        body: IWorkSection[];
    };
}

export interface IPageSectionExpo extends IPageSectionGeneric {
    type: 'expo';
    content: IPageSectionContent & {
        body: IExpoSection;
    };
}

export interface IPageSectionContact extends IPageSectionGeneric {
    type: 'contact';
    content: IPageSectionContent;
}

export interface IPageSectionGeneric {
    pinned: boolean;
    fullWidth: boolean;
    theme: 'dark' | 'light';
}

export type IPageSection = IPageSectionDefault | IPageSectionWork | IPageSectionExpo | IPageSectionContact;

export interface IPageData {
    hasHero: boolean;
    pageTitle: string;
    pageSubtitle: string;
    pageSections: Array<IPageSection>;
}
