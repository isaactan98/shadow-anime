class TMDB {
    private data: any;

    getData() {
        return this.data;
    }

    setData(data: any) {
        this.data = data;
    }
}

export const tmdb = new TMDB();