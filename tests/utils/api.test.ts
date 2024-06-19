import {fetchData} from "../../src/utils/api.js";





describe("API",() => {
    const url = 'https://example.com';
    beforeEach(() => {
        global.fetch = vi.fn()
    });
    afterEach(() => {
        global.fetch.mockClear()
    })
    it('Fetches data properly', async () => {
        global.fetch.mockResolvedValueOnce({
            status:200,
            ok:true,
            json:() => Promise.resolve("4")
        });
        const data = await fetchData(url);

        expect(data).toEqual("4");
        expect(global.fetch).toHaveBeenCalledWith(url);

    });
    it('throws an error on failed request', async () => {
        global.fetch.mockRejectedValueOnce(new Error("Failed to fetch"));
        await expect(fetchData(url)).rejects.toThrowError("Failed to fetch");
        expect(global.fetch).toHaveBeenCalledWith(url);
    });
    it('handles an error', async () => {
        global.fetch.mockResolvedValueOnce({
            status:500,
            ok:false
        });
        await expect(fetchData(url)).rejects.toThrowError("Failed");
        expect(global.fetch).toHaveBeenCalledWith(url);
    });
})
