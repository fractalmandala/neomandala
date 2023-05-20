export interface SearchItem {
    title: string;
    url: string;
    type: string;
    tags: string;
}

export interface createSvelteStore {
    data: [];
    init: () => {}
}