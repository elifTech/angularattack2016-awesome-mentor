declare var jQuery:any;

export class LevelItem {
    public name: string;
    public source: string;
    public img: string;
    public description: string;
    public domain: string;

    constructor(item?: any) {
        if(!item) return;

        this.name = item.name || '';
        this.source = item.source || '';
        this.img = item.img || '';
        this.description = item.description || '';
        this.domain = item.domain || '';
    }

    public _parse(element:DOMParser)
    {
        var head, link, source, img, desc;
        head = jQuery(element);
        source = head.next();
        img = source.next();
        desc = img.next();
        link = source.find('a').attr('href');

        this.name = head.text();
        this.source = link;
        this.img = img.find('a').attr('href');
        this.description = desc.find('strong').text();
        this.domain = link.match(/([\da-z\.-]+)\.([a-z\.]{2,6})/)[0].replace(/w{3}\./, '');
    }

    public toMd()
    {
        return '## ' + this.name + "\n\n" +
        '['+this.name+']'+'('+this.source+')' + "\n\n" +
        '![Image]'+'('+this.img+')' + "\n\n" +
        '**'+this.description+'**' + "\n\n";
    }
    
    public parseFrom(data: any, resource: string) {
        let factory = {
            'youtube': this.parseYoutube,
            'coursera': this.parseCoursera,
            'awesome': this.parseGithub
        };
        factory[resource].call(data);
    }
    
    private parseYoutube(data: any) {
        this.name = data.snippet.title;
        this.source = "https://www.youtube.com/watch?v=" + data.id.videoId;
        this.img = data.snippet.thumbnails.default.url;
        this.description = data.snippet.description;
    }
    
    private parseCoursera(data: any) {
        this.name = data.name;
        this.source = 'https://www.coursera.org/course/' + data.slug;
    }

    private parseGithub(data: any) {
        this.name = data.name;
        this.source = data.href;
        this.description = data.description || 'Category: ' + data.category;
    }
}
