const { checkLink, logCheckLinkResult } = require('./asciidoc-link-check');


describe('test checkLink function', () => {

    it('test valid https link', async () => {
        const link = 'https://docs.asciidoctor.org/asciidoc/latest/';
        const checkLinkResult = await checkLink(link);
        expect(checkLinkResult).toBe('200 OK');
    });

    it('test invalid https link', async () => {
        const link = 'https://docs.asciidocor.org/asciidoc/latest/';
        const checkLinkResult = await checkLink(link);
        expect(checkLinkResult).toBe('FAILED');
    });

    it('test valid http link', async () => {
        const link = 'http://docs.asciidoctor.org/asciidoc/latest/';
        const checkLinkResult = await checkLink(link);
        expect(checkLinkResult).toBe('200 OK');
    });
});


describe('test logCheckLinkResult function', () => {

    it('test valid https link', async () => {
        const logSpy = jest.spyOn(global.console, 'log');
        const link = 'https://docs.asciidoctor.org/asciidoc/latest/';
        await logCheckLinkResult(1, 1, link);
        expect(logSpy.mock.calls).toContainEqual(['1:1   200 OK   https://docs.asciidoctor.org/asciidoc/latest/']);
        logSpy.mockRestore();
    });
});