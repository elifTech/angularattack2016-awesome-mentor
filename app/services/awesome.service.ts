import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Auth} from 'ng2-ui-auth';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GithubService, Repository} from "./github.service";
import {Observable} from "rxjs/Observable";

declare var jQuery:any;

@Injectable()
export class AwesomeService extends GithubService {
    constructor(private _http:Http, private _auth:Auth) {
        super(_http, _auth);
    }

    search(query:string):Promise<Object> {
        let res:string = `
        <h1 align="center">
	<br>
	<img width="400" src="https://cdn.rawgit.com/sindresorhus/awesome/master/media/logo.svg" alt="awesome">
	<br>
	<br>
	<br>
</h1>

> A curated list of awesome lists

- [What is an awesome list?](awesome.md)
- [Contribution guide](contributing.md)
- [Creating a list](create-list.md)<br><sup>Please take the time to read this and do an actual effort with your list. All the low-quality submissions are burning me out...</sup>
- [Buy a sticker](https://www.stickermule.com/marketplace/10034-awesome)

[![Awesome chat](https://badges.gitter.im/sindresorhus/awesome.svg)](https://gitter.im/sindresorhus/awesome)

-

Check out my [blog](https://blog.sindresorhus.com) and follow me on [Twitter](https://twitter.com/sindresorhus).


## Table of Contents

- [Platforms](#platforms)
- [Programming Languages](#programming-languages)
- [Front-end Development](#front-end-development)
- [Back-end Development](#back-end-development)
- [Computer Science](#computer-science)
- [Big Data](#big-data)
- [Theory](#theory)
- [Books](#books)
- [Editors](#editors)
- [Gaming](#gaming)
- [Development Environment](#development-environment)
- [Entertainment](#entertainment)
- [Databases](#databases)
- [Media](#media)
- [Learn](#learn)
- [Security](#security)
- [Content Management System](#content-management-system)
- [Miscellaneous](#miscellaneous)


## Platforms

- [Node.js](https://github.com/sindresorhus/awesome-nodejs)
- [Frontend Development](https://github.com/dypsilon/frontend-dev-bookmarks)
- [iOS](https://github.com/vsouza/awesome-ios)
- [Android](https://github.com/JStumpp/awesome-android)
- [IoT & Hybrid Apps](https://github.com/weblancaster/awesome-IoT-hybrid)
- [Electron](https://github.com/sindresorhus/awesome-electron)
- [Cordova](https://github.com/busterc/awesome-cordova)
- [React Native](https://github.com/jondot/awesome-react-native)
- [Xamarin](https://github.com/benoitjadinon/awesome-xamarin)
- [Linux](https://github.com/aleksandar-todorovic/awesome-linux)
	- [Containers](https://github.com/Friz-zy/awesome-linux-containers)
- [OS X](https://github.com/iCHAIT/awesome-osx)
	- [Command-Line](https://github.com/herrbischoff/awesome-osx-command-line)
	- [Screensavers](https://github.com/aharris88/awesome-osx-screensavers)
- [watchOS](https://github.com/yenchenlin1994/awesome-watchos)
- [JVM](https://github.com/deephacks/awesome-jvm)
- [Salesforce](https://github.com/mailtoharshit/awesome-salesforce)
- [Amazon Web Services](https://github.com/donnemartin/awesome-aws)
- [Windows](https://github.com/RiseLedger/awesome-windows)
- [IPFS](https://github.com/ipfs/awesome-ipfs)
- [Fuse](https://github.com/vinkla/awesome-fuse)
- [Heroku](https://github.com/ianstormtaylor/awesome-heroku)


## Programming Languages

- [JavaScript](https://github.com/sorrycc/awesome-javascript)
	- [Promises](https://github.com/wbinnssmith/awesome-promises)
	- [Standard Style](https://github.com/feross/awesome-standard)
	- [Must Watch Talks](https://github.com/bolshchikov/js-must-watch)
	- [Tips](https://github.com/loverajoel/jstips)
	- [Network Layer](https://github.com/Kikobeats/awesome-network-js)
	- [Micro npm Packages](https://github.com/parro-it/awesome-micro-npm-packages)
	- [Mad Science npm Packages](https://github.com/feross/awesome-mad-science)
	- [Maintenance Modules](https://github.com/maxogden/maintenance-modules) - For npm packages
	- [npm](https://github.com/sindresorhus/awesome-npm)
	- [AVA](https://github.com/sindresorhus/awesome-ava) - Test runner
	- [ESLint](https://github.com/dustinspecker/awesome-eslint)
	- [Functional Programming](https://github.com/stoeffel/awesome-fp-js)
- [Swift](https://github.com/matteocrippa/awesome-swift)
	- [Education](https://github.com/hsavit1/Awesome-Swift-Education)
	- [Playgrounds](https://github.com/uraimo/Awesome-Swift-Playgrounds)
- [Python](https://github.com/vinta/awesome-python)
- [Rust](https://github.com/kud1ing/awesome-rust)
- [Haskell](https://github.com/krispo/awesome-haskell)
- [PureScript](https://github.com/passy/awesome-purescript)
- [Go](https://github.com/avelino/awesome-go)
- [Scala](https://github.com/lauris/awesome-scala)
- [Ruby](https://github.com/markets/awesome-ruby)
	- [Events](https://github.com/planetruby/awesome-events)
- [Clojure](https://github.com/razum2um/awesome-clojure)
- [ClojureScript](https://github.com/emrehan/awesome-clojurescript)
- [Elixir](https://github.com/h4cc/awesome-elixir)
- [Elm](https://github.com/isRuslan/awesome-elm)
- [Erlang](https://github.com/drobakowski/awesome-erlang)
- [Julia](https://github.com/svaksha/Julia.jl)
- [Lua](https://github.com/LewisJEllis/awesome-lua)
- [C](https://github.com/aleksandar-todorovic/awesome-c)
- [C/C++](https://github.com/fffaraz/awesome-cpp)
- [R](https://github.com/qinwf/awesome-R)
- [D](https://github.com/zhaopuming/awesome-d)
- [Common Lisp](https://github.com/CodyReichert/awesome-cl)
- [Perl](https://github.com/hachiojipm/awesome-perl)
- [Groovy](https://github.com/kdabir/awesome-groovy)
- [Dart](https://github.com/yissachar/awesome-dart)
- [Java](https://github.com/akullpp/awesome-java)
	- [RxJava](https://github.com/eleventigers/awesome-rxjava)
- [Kotlin](https://github.com/JavaBy/awesome-kotlin)
- [OCaml](https://github.com/rizo/awesome-ocaml)
- [Coldfusion](https://github.com/seancoyne/awesome-coldfusion)
- [Fortran](https://github.com/rabbiabram/awesome-fortran)
- [.NET](https://github.com/quozd/awesome-dotnet)
- [PHP](https://github.com/ziadoz/awesome-php)
	- [Composer](https://github.com/jakoch/awesome-composer)
- [Delphi](https://github.com/Fr0sT-Brutal/awesome-delphi)
- [Assembler](https://github.com/mat0thew/awesome-asm)
- [AutoHotkey](https://github.com/ahkscript/awesome-AutoHotkey)
- [AutoIt](https://github.com/J2TeaM/awesome-AutoIt)
- [Crystal](https://github.com/veelenga/awesome-crystal)
- [TypeScript](https://github.com/dzharii/awesome-typescript)


## Front-end Development

- [ES6 Tools](https://github.com/addyosmani/es6-tools)
- [Web Performance Optimization](https://github.com/davidsonfellipe/awesome-wpo)
- [Web Tools](https://github.com/lvwzhen/tools)
- [CSS](https://github.com/sotayamashita/awesome-css)
	- [Critical-Path Tools](https://github.com/addyosmani/critical-path-css-tools)
	- [Scalability](https://github.com/davidtheclark/scalable-css-reading-list)
	- [Must-Watch Talks](https://github.com/AllThingsSmitty/must-watch-css)
	- [Protips](https://github.com/AllThingsSmitty/css-protips)
- [React](https://github.com/enaqx/awesome-react)
	- [Relay](https://github.com/expede/awesome-relay)
- [Web Components](https://github.com/mateusortiz/webcomponents-the-right-way)
- [Polymer](https://github.com/Granze/awesome-polymer)
- [Angular 2](https://github.com/AngularClass/awesome-angular2)
- [Angular](https://github.com/gianarb/awesome-angularjs)
- [Backbone](https://github.com/sadcitizen/awesome-backbone)
- [HTML5](https://github.com/diegocard/awesome-html5)
- [SVG](https://github.com/willianjusten/awesome-svg)
- [Canvas](https://github.com/raphamorim/awesome-canvas)
- [KnockoutJS](https://github.com/dnbard/awesome-knockout)
- [Dojo Toolkit](https://github.com/peterkokot/awesome-dojo)
- [Inspiration](https://github.com/NoahBuscher/Inspire)
- [Ember](https://github.com/nmec/awesome-ember)
- [Android UI](https://github.com/wasabeef/awesome-android-ui)
- [iOS UI](https://github.com/cjwirth/awesome-ios-ui)
- [Meteor](https://github.com/Urigo/awesome-meteor)
- [BEM](https://github.com/sturobson/BEM-resources)
- [Flexbox](https://github.com/afonsopacifer/awesome-flexbox)
- [Web Typography](https://github.com/deanhume/typography)
- [Web Accessibility](https://github.com/brunopulis/awesome-a11y)
- [Material Design](https://github.com/sachin1092/awesome-material)
- [D3](https://github.com/wbkd/awesome-d3)
- [Emails](https://github.com/jonathandion/awesome-emails)
- [jQuery](https://github.com/peterkokot/awesome-jquery)
	- [Tips](https://github.com/AllThingsSmitty/jquery-tips-everyone-should-know)
- [Web Audio](https://github.com/notthetup/awesome-webaudio)
- [Offline-First](https://github.com/pazguille/offline-first)
- [Static Website Services](https://github.com/aharris88/awesome-static-website-services)
- [A-Frame VR](https://github.com/aframevr/awesome-aframe) - Virtual reality
- [Cycle.js](https://github.com/vic/awesome-cyclejs)
- [Text Editing](https://github.com/dok/awesome-text-editing)
- [Motion UI Design](https://github.com/fliptheweb/motion-ui-design)
- [Vue.js](https://github.com/vuejs/awesome-vue)
- [Marionette.js](https://github.com/sadcitizen/awesome-marionette)
- [Aurelia](https://github.com/behzad888/awesome-aurelia)
- [Charting](https://github.com/zingchart/awesome-charting)
- [Ionic Framework 2](https://github.com/candelibas/awesome-ionic2)
- [Chrome DevTools](https://github.com/ChromeDevTools/awesome-chrome-devtools)


## Back-end Development

- [Django](https://github.com/rosarior/awesome-django)
- [Flask](https://github.com/humiaozuzu/awesome-flask)
- [Docker](https://github.com/veggiemonk/awesome-docker)
- [Vagrant](https://github.com/iJackUA/awesome-vagrant)
- [Pyramid](https://github.com/uralbash/awesome-pyramid)
- [Play1 Framework](https://github.com/PerfectCarl/awesome-play1)
- [CakePHP](https://github.com/friendsofcake/awesome-cakephp)
- [Symfony](https://github.com/sitepoint/awesome-symfony)
	- [Education](https://github.com/Symfonisti/awesome-symfony-education)
- [Laravel](https://github.com/chiraggude/awesome-laravel)
	- [Education](https://github.com/fukuball/Awesome-Laravel-Education/blob/master/langs/en_US.md)
- [Rails](https://github.com/ekremkaraca/awesome-rails)
	- [Gems](https://github.com/hothero/awesome-rails-gem)
- [Phalcon](https://github.com/sergeyklay/awesome-phalcon)
- [nginx](https://github.com/fcambus/nginx-resources)
- [Dropwizard](https://github.com/stve/awesome-dropwizard)
- [Kubernetes](https://github.com/ramitsurana/awesome-kubernetes)
- [Lumen](https://github.com/unicodeveloper/awesome-lumen)


## Computer Science

- [University Courses](https://github.com/prakhar1989/awesome-courses)
- [Data Science](https://github.com/okulbilisim/awesome-datascience)
- [Machine Learning](https://github.com/josephmisiti/awesome-machine-learning)
	- [Tutorials](https://github.com/ujjwalkarn/Machine-Learning-Tutorials)
- [Speech and Natural Language Processing](https://github.com/edobashira/speech-language-processing)
	- [Spanish](https://github.com/dav009/awesome-spanish-nlp)
- [Linguistics](https://github.com/theimpossibleastronaut/awesome-linguistics)
- [Cryptography](https://github.com/MaciejCzyzewski/retter)
- [Computer Vision](https://github.com/jbhuang0604/awesome-computer-vision)
- [Deep Learning](https://github.com/ChristosChristofidis/awesome-deep-learning) - Neural networks
	- [TensorFlow](https://github.com/jtoy/awesome-tensorflow)
- [Deep Vision](https://github.com/kjw0612/awesome-deep-vision)
- [Open Source Society University](https://github.com/open-source-society/computer-science)
- [Functional Programming](https://github.com/lucasviola/awesome-functional-programming)
- [Static Analysis & Code Quality](https://github.com/mre/awesome-static-analysis)
- [Software-Defined Networking](https://github.com/sdnds-tw/awesome-sdn)


## Big Data

- [Big Data](https://github.com/onurakpolat/awesome-bigdata)
- [Public Datasets](https://github.com/caesar0301/awesome-public-datasets)
- [Hadoop](https://github.com/youngwookim/awesome-hadoop)
- [Data Engineering](https://github.com/igorbarinov/awesome-data-engineering)
- [Streaming](https://github.com/manuzhang/awesome-streaming)


## Theory

- [Papers We Love](https://github.com/papers-we-love/papers-we-love)
- [Talks](https://github.com/JanVanRyswyck/awesome-talks)
- [Algorithms](https://github.com/tayllan/awesome-algorithms)
- [Algorithm Visualizations](https://github.com/enjalot/algovis)
- [Artificial Intelligence](https://github.com/owainlewis/awesome-artificial-intelligence)
- [Search Engine Optimization](https://github.com/marcobiedermann/search-engine-optimization)
- [Competitive Programming](https://github.com/lnishan/awesome-competitive-programming)
- [Math](https://github.com/rossant/awesome-math)


## Books

- [Free Programming Books](https://github.com/vhf/free-programming-books)
- [Free Software Testing Books](https://github.com/ligurio/free-software-testing-books/blob/master/free-software-testing-books.md)
- [Go Books](https://github.com/dariubs/GoBooks)
- [R Books](https://github.com/RomanTsegelskyi/rbooks)
- [Mind Expanding Books](https://github.com/hackerkid/Mind-Expanding-Books)
- [Book Authoring](https://github.com/TalAter/awesome-book-authoring)


## Editors

- [Sublime Text](https://github.com/dreikanter/sublime-bookmarks)
- [Vim](https://github.com/mhinz/vim-galore)
- [Emacs](https://github.com/emacs-tw/awesome-emacs)
- [Atom](https://github.com/mehcode/awesome-atom)
- [Visual Studio Code](https://github.com/viatsko/awesome-vscode)


## Gaming

- [Game Development](https://github.com/ellisonleao/magictools)
- [Game Talks](https://github.com/hzoo/awesome-gametalks)
- [Godot](https://github.com/Calinou/awesome-godot) - Game engine
- [Open Source Games](https://github.com/leereilly/games)
- [Unity](https://github.com/RyanNielson/awesome-unity) - Game engine
- [Chess](https://github.com/hkirat/awesome-chess)
- [LÖVE](https://github.com/JanWerder/awesome-love2d) - Game engine
- [PICO-8](https://github.com/felipebueno/awesome-PICO-8) - Fantasy console


## Development Environment

- [Quick Look Plugins](https://github.com/sindresorhus/quick-look-plugins) - OS X
- [Dev Env](https://github.com/jondot/awesome-devenv)
- [Dotfiles](https://github.com/webpro/awesome-dotfiles)
- [Shell](https://github.com/alebcay/awesome-shell)
- [Command-Line Apps](https://github.com/aharris88/awesome-cli-apps)
- [ZSH Plugins](https://github.com/unixorn/awesome-zsh-plugins)
- [GitHub](https://github.com/phillipadsmith/awesome-github)
	- [Browser Extensions](https://github.com/stefanbuck/awesome-browser-extensions-for-github)
	- [Cheat Sheet](https://github.com/tiimgreen/github-cheat-sheet)
- [Git Cheat Sheet & Git Flow](https://github.com/arslanbilal/git-cheat-sheet)
- [Git Tips](https://github.com/git-tips/tips)
- [Git Add-ons](https://github.com/stevemao/awesome-git-addons)
- [SSH](https://github.com/moul/awesome-ssh)
- [FOSS for Developers](https://github.com/httpsGithubParty/FOSS-for-Dev)


## Entertainment

- [Science Fiction](https://github.com/sindresorhus/awesome-scifi) - Scifi
- [Fantasy](https://github.com/RichardLitt/awesome-fantasy)
- [Podcasts](https://github.com/guipdutra/awesome-geek-podcasts)
- [Email Newsletters](https://github.com/vredniy/awesome-newsletters)


## Databases

- [Database](https://github.com/numetriclabz/awesome-db)
- [MySQL](https://github.com/shlomi-noach/awesome-mysql/blob/gh-pages/index.md)
- [SQLAlchemy](https://github.com/dahlia/awesome-sqlalchemy)
- [InfluxDB](https://github.com/mark-rushakoff/awesome-influxdb)
- [Neo4j](https://github.com/Neueda4j/awesome-neo4j)
- [Doctrine](https://github.com/TomasVotruba/awesome-doctrine) - PHP ORM
- [MongoDB](https://github.com/ramnes/awesome-mongodb)
- [RethinkDB](https://github.com/d3viant0ne/awesome-rethinkdb)


## Media

- [Creative Commons Media](https://github.com/shime/creative-commons-media)
- [Fonts](https://github.com/brabadu/awesome-fonts)
- [Codeface](https://github.com/chrissimpkins/codeface) - Text editor fonts
- [Stock Resources](https://github.com/neutraltone/awesome-stock-resources)
- [GIF](https://github.com/ibaaj/awesome-gif)
- [Music](https://github.com/ciconia/awesome-music)
- [Open Source Documents](https://github.com/nacyot/awesome-opensource-documents)
- [Audio Visualization](https://github.com/willianjusten/awesome-audio-visualization)


## Learn

- [CLI Workshoppers](https://github.com/therebelrobot/awesome-workshopper) - Interactive tutorials
- [Learn to Program](https://github.com/karlhorky/learn-to-program)
- [Speaking](https://github.com/matteofigus/awesome-speaking)
- [Tech Videos](https://github.com/lucasviola/awesome-tech-videos)
- [Dive into Machine Learning](https://github.com/hangtwenty/dive-into-machine-learning)
- [Computer History](https://github.com/watson/awesome-computer-history)


## Security

- [Application Security](https://github.com/paragonie/awesome-appsec)
- [Security](https://github.com/sbilly/awesome-security)
- [CTF](https://github.com/apsdehal/awesome-ctf) - Capture The Flag
- [Malware Analysis](https://github.com/rshipp/awesome-malware-analysis)
- [Android Security](https://github.com/ashishb/android-security-awesome)
- [Hacking](https://github.com/carpedm20/awesome-hacking)
- [Honeypots](https://github.com/paralax/awesome-honeypots)
- [Incident Response](https://github.com/meirwah/awesome-incident-response)


## Content Management System

- [Umbraco](https://github.com/leekelleher/awesome-umbraco)
- [Refinery CMS](https://github.com/refinerycms-contrib/awesome-refinerycms)


## Miscellaneous

- [JSON](https://github.com/burningtree/awesome-json)
- [Discounts for Student Developers](https://github.com/najela/discount-for-student-dev)
- [Slack](https://github.com/matiassingers/awesome-slack)
	- [Communities](https://github.com/filipelinhares/awesome-slack)
- [Conferences](https://github.com/RichardLitt/awesome-conferences)
- [GeoJSON](https://github.com/tmcw/awesome-geojson)
- [Sysadmin](https://github.com/n1trux/awesome-sysadmin)
- [Radio](https://github.com/kyleterry/awesome-radio)
- [Awesome](https://github.com/sindresorhus/awesome)
- [Analytics](https://github.com/onurakpolat/awesome-analytics)
- [Open Companies](https://github.com/opencompany/awesome-open-company)
- [REST](https://github.com/marmelab/awesome-rest)
- [Selenium](https://github.com/christian-bromann/awesome-selenium)
- [Endangered Languages](https://github.com/RichardLitt/endangered-languages)
- [Continuous Delivery](https://github.com/ciandcd/awesome-ciandcd)
- [Services Engineering](https://github.com/mmcgrana/services-engineering)
- [Free for Developers](https://github.com/ripienaar/free-for-dev)
- [Bitcoin](https://github.com/igorbarinov/awesome-bitcoin)
- [Answers](https://github.com/jugoncalves/awesome-answers) - Stack Overflow, Quora, etc
- [Sketch](https://github.com/diessica/awesome-sketch) - OS X design app
- [Places to Post Your Startup](https://github.com/mmccaff/PlacesToPostYourStartup)
- [PCAPTools](https://github.com/caesar0301/awesome-pcaptools)
- [Remote Jobs](https://github.com/lukasz-madon/awesome-remote-job)
- [Boilerplate Projects](https://github.com/melvin0008/awesome-projects-boilerplates)
- [Readme](https://github.com/matiassingers/awesome-readme)
- [Tools](https://github.com/cjbarber/ToolsOfTheTrade)
- [Styleguides](https://github.com/RichardLitt/awesome-styleguides)
- [Design and Development Guides](https://github.com/NARKOZ/guides)
- [Software Engineering Blogs](https://github.com/kilimchoi/engineering-blogs)
- [Self Hosted](https://github.com/Kickball/awesome-selfhosted)
- [FOSS Production Apps](https://github.com/jwaterfaucett/awesome-foss-apps)
- [Gulp](https://github.com/alferov/awesome-gulp)
- [AMA](https://github.com/sindresorhus/amas) - Ask Me Anything
	- [Answers](https://github.com/stoeffel/awesome-ama-answers)
- [Open Source Photography](https://github.com/ibaaj/awesome-OpenSourcePhotography)
- [OpenGL](https://github.com/eug/awesome-opengl)
- [Productivity](https://github.com/jyguyomarch/awesome-productivity)
- [GraphQL](https://github.com/chentsulin/awesome-graphql)
- [Transit](https://github.com/luqmaan/awesome-transit)
- [Research Tools](https://github.com/emptymalei/awesome-research)
- [Niche Job Boards](https://github.com/wfhio/awesome-job-boards)
- [Data Visualization](https://github.com/fasouto/awesome-dataviz)
- [Social Media Share Links](https://github.com/vinkla/share-links)
- [JSON Datasets](https://github.com/jdorfman/awesome-json-datasets)
- [Microservices](https://github.com/mfornos/awesome-microservices)
- [Unicode Code Points](https://github.com/Codepoints/awesome-codepoints)
- [Internet of Things](https://github.com/HQarroum/awesome-iot)
- [Beginner-Friendly Projects](https://github.com/MunGell/awesome-for-beginners)
- [Bluetooth Beacons](https://github.com/beaconinside/awesome-beacon)
- [Programming Interviews](https://github.com/MaximAbramchuck/awesome-interviews)
- [Ripple](https://github.com/vhpoet/awesome-ripple) - Open source distributed settlement network
- [Katas](https://github.com/gmontalvoriv/awesome-katas)
- [Tools for Activism](https://github.com/drewrwilson/toolsforactivism)
- [TAP](https://github.com/sindresorhus/awesome-tap) - Test Anything Protocol
- [Robotics](https://github.com/Kiloreux/awesome-robotics)
- [MQTT](https://github.com/hobbyquaker/awesome-mqtt) - "Internet of Things" connectivity protocol
- [Hacking Spots](https://github.com/diasdavid/awesome-hacking-spots)
- [For Girls](https://github.com/cristianoliveira/awesome4girls)
- [Vorpal](https://github.com/vorpaljs/awesome-vorpal) - Node.js CLI framework
- [OKR Methodology](https://github.com/domenicosolazzo/awesome-okr) - Goal setting & communication best practices
- [Vulkan](https://github.com/vinjn/awesome-vulkan)
- [LaTeX](https://github.com/egeerardyn/awesome-LaTeX) - Typesetting language
- [Network Analysis](https://github.com/briatte/awesome-network-analysis)
- [Economics](https://github.com/antontarasenko/awesome-economics) - An economist's starter kit


## License

[![CC0](http://mirrors.creativecommons.org/presskit/buttons/88x31/svg/cc-zero.svg)](https://creativecommons.org/publicdomain/zero/1.0/)

To the extent possible under law, [Sindre Sorhus](http://sindresorhus.com) has waived all copyright and related or neighboring rights to this work.
        `;

        // let rep :Repository = this.getRepository("sindresorhus", "awesome");
        return new Promise((resolve, reject) => {
            // rep.getReadmeContent((res) => {
            // console.info(res);

            // let g:string[] = res.split("\n##");
            //
            // delete g[0];
            // delete g[-1];
            //
            // // let obj: any = {};
            // let obj:any = [];
            //
            // g.forEach(item => {
            //     let items:string[] = item.split('\n');
            //
            //     let part:string = items[0].trim();
            //     delete items[0];
            //
            //     obj = obj.concat(items);
            // });

            // this.fromMarkdown(res, (r) => {
            //     console.log(r);
            // });

            let r: string = `
<pre><code>    &lt;h1 align="center"&gt;
&lt;br&gt;
&lt;img width="400" src="https://cdn.rawgit.com/sindresorhus/awesome/master/media/logo.svg" alt="awesome"&gt;
&lt;br&gt;
&lt;br&gt;
&lt;br&gt;
</code></pre>

<p></p>

<blockquote>
<p>A curated list of awesome lists</p>
</blockquote>

<ul>
<li><a href="awesome.md">What is an awesome list?</a></li>
<li><a href="contributing.md">Contribution guide</a></li>
<li>
<a href="create-list.md">Creating a list</a><br><sup>Please take the time to read this and do an actual effort with your list. All the low-quality submissions are burning me out...</sup>
</li>
<li><a href="https://www.stickermule.com/marketplace/10034-awesome">Buy a sticker</a></li>
</ul>

<p><a href="https://gitter.im/sindresorhus/awesome"><img src="https://camo.githubusercontent.com/467b238f3dcf67177f3f89aa49256bf476e493c0/68747470733a2f2f6261646765732e6769747465722e696d2f73696e647265736f726875732f617765736f6d652e737667" alt="Awesome chat" data-canonical-src="https://badges.gitter.im/sindresorhus/awesome.svg" style="max-width:100%;"></a></p>

<h2></h2>

<p>Check out my <a href="https://blog.sindresorhus.com">blog</a> and follow me on <a href="https://twitter.com/sindresorhus">Twitter</a>.</p>

<h2>
<a id="user-content-table-of-contents" class="anchor" href="#table-of-contents" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Table of Contents</h2>

<ul>
<li><a href="#platforms">Platforms</a></li>
<li><a href="#programming-languages">Programming Languages</a></li>
<li><a href="#front-end-development">Front-end Development</a></li>
<li><a href="#back-end-development">Back-end Development</a></li>
<li><a href="#computer-science">Computer Science</a></li>
<li><a href="#big-data">Big Data</a></li>
<li><a href="#theory">Theory</a></li>
<li><a href="#books">Books</a></li>
<li><a href="#editors">Editors</a></li>
<li><a href="#gaming">Gaming</a></li>
<li><a href="#development-environment">Development Environment</a></li>
<li><a href="#entertainment">Entertainment</a></li>
<li><a href="#databases">Databases</a></li>
<li><a href="#media">Media</a></li>
<li><a href="#learn">Learn</a></li>
<li><a href="#security">Security</a></li>
<li><a href="#content-management-system">Content Management System</a></li>
<li><a href="#miscellaneous">Miscellaneous</a></li>
</ul>

<h2>
<a id="user-content-platforms" class="anchor" href="#platforms" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Platforms</h2>

<ul>
<li><a href="https://github.com/sindresorhus/awesome-nodejs">Node.js</a></li>
<li><a href="https://github.com/dypsilon/frontend-dev-bookmarks">Frontend Development</a></li>
<li><a href="https://github.com/vsouza/awesome-ios">iOS</a></li>
<li><a href="https://github.com/JStumpp/awesome-android">Android</a></li>
<li><a href="https://github.com/weblancaster/awesome-IoT-hybrid">IoT &amp; Hybrid Apps</a></li>
<li><a href="https://github.com/sindresorhus/awesome-electron">Electron</a></li>
<li><a href="https://github.com/busterc/awesome-cordova">Cordova</a></li>
<li><a href="https://github.com/jondot/awesome-react-native">React Native</a></li>
<li><a href="https://github.com/benoitjadinon/awesome-xamarin">Xamarin</a></li>
<li>
<a href="https://github.com/aleksandar-todorovic/awesome-linux">Linux</a>

<ul>
<li><a href="https://github.com/Friz-zy/awesome-linux-containers">Containers</a></li>
</ul>
</li>
<li>
<a href="https://github.com/iCHAIT/awesome-osx">OS X</a>

<ul>
<li><a href="https://github.com/herrbischoff/awesome-osx-command-line">Command-Line</a></li>
<li><a href="https://github.com/aharris88/awesome-osx-screensavers">Screensavers</a></li>
</ul>
</li>
<li><a href="https://github.com/yenchenlin1994/awesome-watchos">watchOS</a></li>
<li><a href="https://github.com/deephacks/awesome-jvm">JVM</a></li>
<li><a href="https://github.com/mailtoharshit/awesome-salesforce">Salesforce</a></li>
<li><a href="https://github.com/donnemartin/awesome-aws">Amazon Web Services</a></li>
<li><a href="https://github.com/RiseLedger/awesome-windows">Windows</a></li>
<li><a href="https://github.com/ipfs/awesome-ipfs">IPFS</a></li>
<li><a href="https://github.com/vinkla/awesome-fuse">Fuse</a></li>
<li><a href="https://github.com/ianstormtaylor/awesome-heroku">Heroku</a></li>
</ul>

<h2>
<a id="user-content-programming-languages" class="anchor" href="#programming-languages" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Programming Languages</h2>

<ul>
<li>
<a href="https://github.com/sorrycc/awesome-javascript">JavaScript</a>

<ul>
<li><a href="https://github.com/wbinnssmith/awesome-promises">Promises</a></li>
<li><a href="https://github.com/feross/awesome-standard">Standard Style</a></li>
<li><a href="https://github.com/bolshchikov/js-must-watch">Must Watch Talks</a></li>
<li><a href="https://github.com/loverajoel/jstips">Tips</a></li>
<li><a href="https://github.com/Kikobeats/awesome-network-js">Network Layer</a></li>
<li><a href="https://github.com/parro-it/awesome-micro-npm-packages">Micro npm Packages</a></li>
<li><a href="https://github.com/feross/awesome-mad-science">Mad Science npm Packages</a></li>
<li>
<a href="https://github.com/maxogden/maintenance-modules">Maintenance Modules</a> - For npm packages</li>
<li><a href="https://github.com/sindresorhus/awesome-npm">npm</a></li>
<li>
<a href="https://github.com/sindresorhus/awesome-ava">AVA</a> - Test runner</li>
<li><a href="https://github.com/dustinspecker/awesome-eslint">ESLint</a></li>
<li><a href="https://github.com/stoeffel/awesome-fp-js">Functional Programming</a></li>
</ul>
</li>
<li>
<a href="https://github.com/matteocrippa/awesome-swift">Swift</a>

<ul>
<li><a href="https://github.com/hsavit1/Awesome-Swift-Education">Education</a></li>
<li><a href="https://github.com/uraimo/Awesome-Swift-Playgrounds">Playgrounds</a></li>
</ul>
</li>
<li><a href="https://github.com/vinta/awesome-python">Python</a></li>
<li><a href="https://github.com/kud1ing/awesome-rust">Rust</a></li>
<li><a href="https://github.com/krispo/awesome-haskell">Haskell</a></li>
<li><a href="https://github.com/passy/awesome-purescript">PureScript</a></li>
<li><a href="https://github.com/avelino/awesome-go">Go</a></li>
<li><a href="https://github.com/lauris/awesome-scala">Scala</a></li>
<li>
<a href="https://github.com/markets/awesome-ruby">Ruby</a>

<ul>
<li><a href="https://github.com/planetruby/awesome-events">Events</a></li>
</ul>
</li>
<li><a href="https://github.com/razum2um/awesome-clojure">Clojure</a></li>
<li><a href="https://github.com/emrehan/awesome-clojurescript">ClojureScript</a></li>
<li><a href="https://github.com/h4cc/awesome-elixir">Elixir</a></li>
<li><a href="https://github.com/isRuslan/awesome-elm">Elm</a></li>
<li><a href="https://github.com/drobakowski/awesome-erlang">Erlang</a></li>
<li><a href="https://github.com/svaksha/Julia.jl">Julia</a></li>
<li><a href="https://github.com/LewisJEllis/awesome-lua">Lua</a></li>
<li><a href="https://github.com/aleksandar-todorovic/awesome-c">C</a></li>
<li><a href="https://github.com/fffaraz/awesome-cpp">C/C++</a></li>
<li><a href="https://github.com/qinwf/awesome-R">R</a></li>
<li><a href="https://github.com/zhaopuming/awesome-d">D</a></li>
<li><a href="https://github.com/CodyReichert/awesome-cl">Common Lisp</a></li>
<li><a href="https://github.com/hachiojipm/awesome-perl">Perl</a></li>
<li><a href="https://github.com/kdabir/awesome-groovy">Groovy</a></li>
<li><a href="https://github.com/yissachar/awesome-dart">Dart</a></li>
<li>
<a href="https://github.com/akullpp/awesome-java">Java</a>

<ul>
<li><a href="https://github.com/eleventigers/awesome-rxjava">RxJava</a></li>
</ul>
</li>
<li><a href="https://github.com/JavaBy/awesome-kotlin">Kotlin</a></li>
<li><a href="https://github.com/rizo/awesome-ocaml">OCaml</a></li>
<li><a href="https://github.com/seancoyne/awesome-coldfusion">Coldfusion</a></li>
<li><a href="https://github.com/rabbiabram/awesome-fortran">Fortran</a></li>
<li><a href="https://github.com/quozd/awesome-dotnet">.NET</a></li>
<li>
<a href="https://github.com/ziadoz/awesome-php">PHP</a>

<ul>
<li><a href="https://github.com/jakoch/awesome-composer">Composer</a></li>
</ul>
</li>
<li><a href="https://github.com/Fr0sT-Brutal/awesome-delphi">Delphi</a></li>
<li><a href="https://github.com/mat0thew/awesome-asm">Assembler</a></li>
<li><a href="https://github.com/ahkscript/awesome-AutoHotkey">AutoHotkey</a></li>
<li><a href="https://github.com/J2TeaM/awesome-AutoIt">AutoIt</a></li>
<li><a href="https://github.com/veelenga/awesome-crystal">Crystal</a></li>
<li><a href="https://github.com/dzharii/awesome-typescript">TypeScript</a></li>
</ul>

<h2>
<a id="user-content-front-end-development" class="anchor" href="#front-end-development" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Front-end Development</h2>

<ul>
<li><a href="https://github.com/addyosmani/es6-tools">ES6 Tools</a></li>
<li><a href="https://github.com/davidsonfellipe/awesome-wpo">Web Performance Optimization</a></li>
<li><a href="https://github.com/lvwzhen/tools">Web Tools</a></li>
<li>
<a href="https://github.com/sotayamashita/awesome-css">CSS</a>

<ul>
<li><a href="https://github.com/addyosmani/critical-path-css-tools">Critical-Path Tools</a></li>
<li><a href="https://github.com/davidtheclark/scalable-css-reading-list">Scalability</a></li>
<li><a href="https://github.com/AllThingsSmitty/must-watch-css">Must-Watch Talks</a></li>
<li><a href="https://github.com/AllThingsSmitty/css-protips">Protips</a></li>
</ul>
</li>
<li>
<a href="https://github.com/enaqx/awesome-react">React</a>

<ul>
<li><a href="https://github.com/expede/awesome-relay">Relay</a></li>
</ul>
</li>
<li><a href="https://github.com/mateusortiz/webcomponents-the-right-way">Web Components</a></li>
<li><a href="https://github.com/Granze/awesome-polymer">Polymer</a></li>
<li><a href="https://github.com/AngularClass/awesome-angular2">Angular 2</a></li>
<li><a href="https://github.com/gianarb/awesome-angularjs">Angular</a></li>
<li><a href="https://github.com/sadcitizen/awesome-backbone">Backbone</a></li>
<li><a href="https://github.com/diegocard/awesome-html5">HTML5</a></li>
<li><a href="https://github.com/willianjusten/awesome-svg">SVG</a></li>
<li><a href="https://github.com/raphamorim/awesome-canvas">Canvas</a></li>
<li><a href="https://github.com/dnbard/awesome-knockout">KnockoutJS</a></li>
<li><a href="https://github.com/peterkokot/awesome-dojo">Dojo Toolkit</a></li>
<li><a href="https://github.com/NoahBuscher/Inspire">Inspiration</a></li>
<li><a href="https://github.com/nmec/awesome-ember">Ember</a></li>
<li><a href="https://github.com/wasabeef/awesome-android-ui">Android UI</a></li>
<li><a href="https://github.com/cjwirth/awesome-ios-ui">iOS UI</a></li>
<li><a href="https://github.com/Urigo/awesome-meteor">Meteor</a></li>
<li><a href="https://github.com/sturobson/BEM-resources">BEM</a></li>
<li><a href="https://github.com/afonsopacifer/awesome-flexbox">Flexbox</a></li>
<li><a href="https://github.com/deanhume/typography">Web Typography</a></li>
<li><a href="https://github.com/brunopulis/awesome-a11y">Web Accessibility</a></li>
<li><a href="https://github.com/sachin1092/awesome-material">Material Design</a></li>
<li><a href="https://github.com/wbkd/awesome-d3">D3</a></li>
<li><a href="https://github.com/jonathandion/awesome-emails">Emails</a></li>
<li>
<a href="https://github.com/peterkokot/awesome-jquery">jQuery</a>

<ul>
<li><a href="https://github.com/AllThingsSmitty/jquery-tips-everyone-should-know">Tips</a></li>
</ul>
</li>
<li><a href="https://github.com/notthetup/awesome-webaudio">Web Audio</a></li>
<li><a href="https://github.com/pazguille/offline-first">Offline-First</a></li>
<li><a href="https://github.com/aharris88/awesome-static-website-services">Static Website Services</a></li>
<li>
<a href="https://github.com/aframevr/awesome-aframe">A-Frame VR</a> - Virtual reality</li>
<li><a href="https://github.com/vic/awesome-cyclejs">Cycle.js</a></li>
<li><a href="https://github.com/dok/awesome-text-editing">Text Editing</a></li>
<li><a href="https://github.com/fliptheweb/motion-ui-design">Motion UI Design</a></li>
<li><a href="https://github.com/vuejs/awesome-vue">Vue.js</a></li>
<li><a href="https://github.com/sadcitizen/awesome-marionette">Marionette.js</a></li>
<li><a href="https://github.com/behzad888/awesome-aurelia">Aurelia</a></li>
<li><a href="https://github.com/zingchart/awesome-charting">Charting</a></li>
<li><a href="https://github.com/candelibas/awesome-ionic2">Ionic Framework 2</a></li>
<li><a href="https://github.com/ChromeDevTools/awesome-chrome-devtools">Chrome DevTools</a></li>
</ul>

<h2>
<a id="user-content-back-end-development" class="anchor" href="#back-end-development" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Back-end Development</h2>

<ul>
<li><a href="https://github.com/rosarior/awesome-django">Django</a></li>
<li><a href="https://github.com/humiaozuzu/awesome-flask">Flask</a></li>
<li><a href="https://github.com/veggiemonk/awesome-docker">Docker</a></li>
<li><a href="https://github.com/iJackUA/awesome-vagrant">Vagrant</a></li>
<li><a href="https://github.com/uralbash/awesome-pyramid">Pyramid</a></li>
<li><a href="https://github.com/PerfectCarl/awesome-play1">Play1 Framework</a></li>
<li><a href="https://github.com/friendsofcake/awesome-cakephp">CakePHP</a></li>
<li>
<a href="https://github.com/sitepoint/awesome-symfony">Symfony</a>

<ul>
<li><a href="https://github.com/Symfonisti/awesome-symfony-education">Education</a></li>
</ul>
</li>
<li>
<a href="https://github.com/chiraggude/awesome-laravel">Laravel</a>

<ul>
<li><a href="https://github.com/fukuball/Awesome-Laravel-Education/blob/master/langs/en_US.md">Education</a></li>
</ul>
</li>
<li>
<a href="https://github.com/ekremkaraca/awesome-rails">Rails</a>

<ul>
<li><a href="https://github.com/hothero/awesome-rails-gem">Gems</a></li>
</ul>
</li>
<li><a href="https://github.com/sergeyklay/awesome-phalcon">Phalcon</a></li>
<li><a href="https://github.com/fcambus/nginx-resources">nginx</a></li>
<li><a href="https://github.com/stve/awesome-dropwizard">Dropwizard</a></li>
<li><a href="https://github.com/ramitsurana/awesome-kubernetes">Kubernetes</a></li>
<li><a href="https://github.com/unicodeveloper/awesome-lumen">Lumen</a></li>
</ul>

<h2>
<a id="user-content-computer-science" class="anchor" href="#computer-science" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Computer Science</h2>

<ul>
<li><a href="https://github.com/prakhar1989/awesome-courses">University Courses</a></li>
<li><a href="https://github.com/okulbilisim/awesome-datascience">Data Science</a></li>
<li>
<a href="https://github.com/josephmisiti/awesome-machine-learning">Machine Learning</a>

<ul>
<li><a href="https://github.com/ujjwalkarn/Machine-Learning-Tutorials">Tutorials</a></li>
</ul>
</li>
<li>
<a href="https://github.com/edobashira/speech-language-processing">Speech and Natural Language Processing</a>

<ul>
<li><a href="https://github.com/dav009/awesome-spanish-nlp">Spanish</a></li>
</ul>
</li>
<li><a href="https://github.com/theimpossibleastronaut/awesome-linguistics">Linguistics</a></li>
<li><a href="https://github.com/MaciejCzyzewski/retter">Cryptography</a></li>
<li><a href="https://github.com/jbhuang0604/awesome-computer-vision">Computer Vision</a></li>
<li>
<a href="https://github.com/ChristosChristofidis/awesome-deep-learning">Deep Learning</a> - Neural networks

<ul>
<li><a href="https://github.com/jtoy/awesome-tensorflow">TensorFlow</a></li>
</ul>
</li>
<li><a href="https://github.com/kjw0612/awesome-deep-vision">Deep Vision</a></li>
<li><a href="https://github.com/open-source-society/computer-science">Open Source Society University</a></li>
<li><a href="https://github.com/lucasviola/awesome-functional-programming">Functional Programming</a></li>
<li><a href="https://github.com/mre/awesome-static-analysis">Static Analysis &amp; Code Quality</a></li>
<li><a href="https://github.com/sdnds-tw/awesome-sdn">Software-Defined Networking</a></li>
</ul>

<h2>
<a id="user-content-big-data" class="anchor" href="#big-data" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Big Data</h2>

<ul>
<li><a href="https://github.com/onurakpolat/awesome-bigdata">Big Data</a></li>
<li><a href="https://github.com/caesar0301/awesome-public-datasets">Public Datasets</a></li>
<li><a href="https://github.com/youngwookim/awesome-hadoop">Hadoop</a></li>
<li><a href="https://github.com/igorbarinov/awesome-data-engineering">Data Engineering</a></li>
<li><a href="https://github.com/manuzhang/awesome-streaming">Streaming</a></li>
</ul>

<h2>
<a id="user-content-theory" class="anchor" href="#theory" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Theory</h2>

<ul>
<li><a href="https://github.com/papers-we-love/papers-we-love">Papers We Love</a></li>
<li><a href="https://github.com/JanVanRyswyck/awesome-talks">Talks</a></li>
<li><a href="https://github.com/tayllan/awesome-algorithms">Algorithms</a></li>
<li><a href="https://github.com/enjalot/algovis">Algorithm Visualizations</a></li>
<li><a href="https://github.com/owainlewis/awesome-artificial-intelligence">Artificial Intelligence</a></li>
<li><a href="https://github.com/marcobiedermann/search-engine-optimization">Search Engine Optimization</a></li>
<li><a href="https://github.com/lnishan/awesome-competitive-programming">Competitive Programming</a></li>
<li><a href="https://github.com/rossant/awesome-math">Math</a></li>
</ul>

<h2>
<a id="user-content-books" class="anchor" href="#books" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Books</h2>

<ul>
<li><a href="https://github.com/vhf/free-programming-books">Free Programming Books</a></li>
<li><a href="https://github.com/ligurio/free-software-testing-books/blob/master/free-software-testing-books.md">Free Software Testing Books</a></li>
<li><a href="https://github.com/dariubs/GoBooks">Go Books</a></li>
<li><a href="https://github.com/RomanTsegelskyi/rbooks">R Books</a></li>
<li><a href="https://github.com/hackerkid/Mind-Expanding-Books">Mind Expanding Books</a></li>
<li><a href="https://github.com/TalAter/awesome-book-authoring">Book Authoring</a></li>
</ul>

<h2>
<a id="user-content-editors" class="anchor" href="#editors" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Editors</h2>

<ul>
<li><a href="https://github.com/dreikanter/sublime-bookmarks">Sublime Text</a></li>
<li><a href="https://github.com/mhinz/vim-galore">Vim</a></li>
<li><a href="https://github.com/emacs-tw/awesome-emacs">Emacs</a></li>
<li><a href="https://github.com/mehcode/awesome-atom">Atom</a></li>
<li><a href="https://github.com/viatsko/awesome-vscode">Visual Studio Code</a></li>
</ul>

<h2>
<a id="user-content-gaming" class="anchor" href="#gaming" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Gaming</h2>

<ul>
<li><a href="https://github.com/ellisonleao/magictools">Game Development</a></li>
<li><a href="https://github.com/hzoo/awesome-gametalks">Game Talks</a></li>
<li>
<a href="https://github.com/Calinou/awesome-godot">Godot</a> - Game engine</li>
<li><a href="https://github.com/leereilly/games">Open Source Games</a></li>
<li>
<a href="https://github.com/RyanNielson/awesome-unity">Unity</a> - Game engine</li>
<li><a href="https://github.com/hkirat/awesome-chess">Chess</a></li>
<li>
<a href="https://github.com/JanWerder/awesome-love2d">LÖVE</a> - Game engine</li>
<li>
<a href="https://github.com/felipebueno/awesome-PICO-8">PICO-8</a> - Fantasy console</li>
</ul>

<h2>
<a id="user-content-development-environment" class="anchor" href="#development-environment" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Development Environment</h2>

<ul>
<li>
<a href="https://github.com/sindresorhus/quick-look-plugins">Quick Look Plugins</a> - OS X</li>
<li><a href="https://github.com/jondot/awesome-devenv">Dev Env</a></li>
<li><a href="https://github.com/webpro/awesome-dotfiles">Dotfiles</a></li>
<li><a href="https://github.com/alebcay/awesome-shell">Shell</a></li>
<li><a href="https://github.com/aharris88/awesome-cli-apps">Command-Line Apps</a></li>
<li><a href="https://github.com/unixorn/awesome-zsh-plugins">ZSH Plugins</a></li>
<li>
<a href="https://github.com/phillipadsmith/awesome-github">GitHub</a>

<ul>
<li><a href="https://github.com/stefanbuck/awesome-browser-extensions-for-github">Browser Extensions</a></li>
<li><a href="https://github.com/tiimgreen/github-cheat-sheet">Cheat Sheet</a></li>
</ul>
</li>
<li><a href="https://github.com/arslanbilal/git-cheat-sheet">Git Cheat Sheet &amp; Git Flow</a></li>
<li><a href="https://github.com/git-tips/tips">Git Tips</a></li>
<li><a href="https://github.com/stevemao/awesome-git-addons">Git Add-ons</a></li>
<li><a href="https://github.com/moul/awesome-ssh">SSH</a></li>
<li><a href="https://github.com/httpsGithubParty/FOSS-for-Dev">FOSS for Developers</a></li>
</ul>

<h2>
<a id="user-content-entertainment" class="anchor" href="#entertainment" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Entertainment</h2>

<ul>
<li>
<a href="https://github.com/sindresorhus/awesome-scifi">Science Fiction</a> - Scifi</li>
<li><a href="https://github.com/RichardLitt/awesome-fantasy">Fantasy</a></li>
<li><a href="https://github.com/guipdutra/awesome-geek-podcasts">Podcasts</a></li>
<li><a href="https://github.com/vredniy/awesome-newsletters">Email Newsletters</a></li>
</ul>

<h2>
<a id="user-content-databases" class="anchor" href="#databases" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Databases</h2>

<ul>
<li><a href="https://github.com/numetriclabz/awesome-db">Database</a></li>
<li><a href="https://github.com/shlomi-noach/awesome-mysql/blob/gh-pages/index.md">MySQL</a></li>
<li><a href="https://github.com/dahlia/awesome-sqlalchemy">SQLAlchemy</a></li>
<li><a href="https://github.com/mark-rushakoff/awesome-influxdb">InfluxDB</a></li>
<li><a href="https://github.com/Neueda4j/awesome-neo4j">Neo4j</a></li>
<li>
<a href="https://github.com/TomasVotruba/awesome-doctrine">Doctrine</a> - PHP ORM</li>
<li><a href="https://github.com/ramnes/awesome-mongodb">MongoDB</a></li>
<li><a href="https://github.com/d3viant0ne/awesome-rethinkdb">RethinkDB</a></li>
</ul>

<h2>
<a id="user-content-media" class="anchor" href="#media" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Media</h2>

<ul>
<li><a href="https://github.com/shime/creative-commons-media">Creative Commons Media</a></li>
<li><a href="https://github.com/brabadu/awesome-fonts">Fonts</a></li>
<li>
<a href="https://github.com/chrissimpkins/codeface">Codeface</a> - Text editor fonts</li>
<li><a href="https://github.com/neutraltone/awesome-stock-resources">Stock Resources</a></li>
<li><a href="https://github.com/ibaaj/awesome-gif">GIF</a></li>
<li><a href="https://github.com/ciconia/awesome-music">Music</a></li>
<li><a href="https://github.com/nacyot/awesome-opensource-documents">Open Source Documents</a></li>
<li><a href="https://github.com/willianjusten/awesome-audio-visualization">Audio Visualization</a></li>
</ul>

<h2>
<a id="user-content-learn" class="anchor" href="#learn" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Learn</h2>

<ul>
<li>
<a href="https://github.com/therebelrobot/awesome-workshopper">CLI Workshoppers</a> - Interactive tutorials</li>
<li><a href="https://github.com/karlhorky/learn-to-program">Learn to Program</a></li>
<li><a href="https://github.com/matteofigus/awesome-speaking">Speaking</a></li>
<li><a href="https://github.com/lucasviola/awesome-tech-videos">Tech Videos</a></li>
<li><a href="https://github.com/hangtwenty/dive-into-machine-learning">Dive into Machine Learning</a></li>
<li><a href="https://github.com/watson/awesome-computer-history">Computer History</a></li>
</ul>

<h2>
<a id="user-content-security" class="anchor" href="#security" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Security</h2>

<ul>
<li><a href="https://github.com/paragonie/awesome-appsec">Application Security</a></li>
<li><a href="https://github.com/sbilly/awesome-security">Security</a></li>
<li>
<a href="https://github.com/apsdehal/awesome-ctf">CTF</a> - Capture The Flag</li>
<li><a href="https://github.com/rshipp/awesome-malware-analysis">Malware Analysis</a></li>
<li><a href="https://github.com/ashishb/android-security-awesome">Android Security</a></li>
<li><a href="https://github.com/carpedm20/awesome-hacking">Hacking</a></li>
<li><a href="https://github.com/paralax/awesome-honeypots">Honeypots</a></li>
<li><a href="https://github.com/meirwah/awesome-incident-response">Incident Response</a></li>
</ul>

<h2>
<a id="user-content-content-management-system" class="anchor" href="#content-management-system" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Content Management System</h2>

<ul>
<li><a href="https://github.com/leekelleher/awesome-umbraco">Umbraco</a></li>
<li><a href="https://github.com/refinerycms-contrib/awesome-refinerycms">Refinery CMS</a></li>
</ul>

<h2>
<a id="user-content-miscellaneous" class="anchor" href="#miscellaneous" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>Miscellaneous</h2>

<ul>
<li><a href="https://github.com/burningtree/awesome-json">JSON</a></li>
<li><a href="https://github.com/najela/discount-for-student-dev">Discounts for Student Developers</a></li>
<li>
<a href="https://github.com/matiassingers/awesome-slack">Slack</a>

<ul>
<li><a href="https://github.com/filipelinhares/awesome-slack">Communities</a></li>
</ul>
</li>
<li><a href="https://github.com/RichardLitt/awesome-conferences">Conferences</a></li>
<li><a href="https://github.com/tmcw/awesome-geojson">GeoJSON</a></li>
<li><a href="https://github.com/n1trux/awesome-sysadmin">Sysadmin</a></li>
<li><a href="https://github.com/kyleterry/awesome-radio">Radio</a></li>
<li><a href="https://github.com/sindresorhus/awesome">Awesome</a></li>
<li><a href="https://github.com/onurakpolat/awesome-analytics">Analytics</a></li>
<li><a href="https://github.com/opencompany/awesome-open-company">Open Companies</a></li>
<li><a href="https://github.com/marmelab/awesome-rest">REST</a></li>
<li><a href="https://github.com/christian-bromann/awesome-selenium">Selenium</a></li>
<li><a href="https://github.com/RichardLitt/endangered-languages">Endangered Languages</a></li>
<li><a href="https://github.com/ciandcd/awesome-ciandcd">Continuous Delivery</a></li>
<li><a href="https://github.com/mmcgrana/services-engineering">Services Engineering</a></li>
<li><a href="https://github.com/ripienaar/free-for-dev">Free for Developers</a></li>
<li><a href="https://github.com/igorbarinov/awesome-bitcoin">Bitcoin</a></li>
<li>
<a href="https://github.com/jugoncalves/awesome-answers">Answers</a> - Stack Overflow, Quora, etc</li>
<li>
<a href="https://github.com/diessica/awesome-sketch">Sketch</a> - OS X design app</li>
<li><a href="https://github.com/mmccaff/PlacesToPostYourStartup">Places to Post Your Startup</a></li>
<li><a href="https://github.com/caesar0301/awesome-pcaptools">PCAPTools</a></li>
<li><a href="https://github.com/lukasz-madon/awesome-remote-job">Remote Jobs</a></li>
<li><a href="https://github.com/melvin0008/awesome-projects-boilerplates">Boilerplate Projects</a></li>
<li><a href="https://github.com/matiassingers/awesome-readme">Readme</a></li>
<li><a href="https://github.com/cjbarber/ToolsOfTheTrade">Tools</a></li>
<li><a href="https://github.com/RichardLitt/awesome-styleguides">Styleguides</a></li>
<li><a href="https://github.com/NARKOZ/guides">Design and Development Guides</a></li>
<li><a href="https://github.com/kilimchoi/engineering-blogs">Software Engineering Blogs</a></li>
<li><a href="https://github.com/Kickball/awesome-selfhosted">Self Hosted</a></li>
<li><a href="https://github.com/jwaterfaucett/awesome-foss-apps">FOSS Production Apps</a></li>
<li><a href="https://github.com/alferov/awesome-gulp">Gulp</a></li>
<li>
<a href="https://github.com/sindresorhus/amas">AMA</a> - Ask Me Anything

<ul>
<li><a href="https://github.com/stoeffel/awesome-ama-answers">Answers</a></li>
</ul>
</li>
<li><a href="https://github.com/ibaaj/awesome-OpenSourcePhotography">Open Source Photography</a></li>
<li><a href="https://github.com/eug/awesome-opengl">OpenGL</a></li>
<li><a href="https://github.com/jyguyomarch/awesome-productivity">Productivity</a></li>
<li><a href="https://github.com/chentsulin/awesome-graphql">GraphQL</a></li>
<li><a href="https://github.com/luqmaan/awesome-transit">Transit</a></li>
<li><a href="https://github.com/emptymalei/awesome-research">Research Tools</a></li>
<li><a href="https://github.com/wfhio/awesome-job-boards">Niche Job Boards</a></li>
<li><a href="https://github.com/fasouto/awesome-dataviz">Data Visualization</a></li>
<li><a href="https://github.com/vinkla/share-links">Social Media Share Links</a></li>
<li><a href="https://github.com/jdorfman/awesome-json-datasets">JSON Datasets</a></li>
<li><a href="https://github.com/mfornos/awesome-microservices">Microservices</a></li>
<li><a href="https://github.com/Codepoints/awesome-codepoints">Unicode Code Points</a></li>
<li><a href="https://github.com/HQarroum/awesome-iot">Internet of Things</a></li>
<li><a href="https://github.com/MunGell/awesome-for-beginners">Beginner-Friendly Projects</a></li>
<li><a href="https://github.com/beaconinside/awesome-beacon">Bluetooth Beacons</a></li>
<li><a href="https://github.com/MaximAbramchuck/awesome-interviews">Programming Interviews</a></li>
<li>
<a href="https://github.com/vhpoet/awesome-ripple">Ripple</a> - Open source distributed settlement network</li>
<li><a href="https://github.com/gmontalvoriv/awesome-katas">Katas</a></li>
<li><a href="https://github.com/drewrwilson/toolsforactivism">Tools for Activism</a></li>
<li>
<a href="https://github.com/sindresorhus/awesome-tap">TAP</a> - Test Anything Protocol</li>
<li><a href="https://github.com/Kiloreux/awesome-robotics">Robotics</a></li>
<li>
<a href="https://github.com/hobbyquaker/awesome-mqtt">MQTT</a> - "Internet of Things" connectivity protocol</li>
<li><a href="https://github.com/diasdavid/awesome-hacking-spots">Hacking Spots</a></li>
<li><a href="https://github.com/cristianoliveira/awesome4girls">For Girls</a></li>
<li>
<a href="https://github.com/vorpaljs/awesome-vorpal">Vorpal</a> - Node.js CLI framework</li>
<li>
<a href="https://github.com/domenicosolazzo/awesome-okr">OKR Methodology</a> - Goal setting &amp; communication best practices</li>
<li><a href="https://github.com/vinjn/awesome-vulkan">Vulkan</a></li>
<li>
<a href="https://github.com/egeerardyn/awesome-LaTeX">LaTeX</a> - Typesetting language</li>
<li><a href="https://github.com/briatte/awesome-network-analysis">Network Analysis</a></li>
<li>
<a href="https://github.com/antontarasenko/awesome-economics">Economics</a> - An economist's starter kit</li>
</ul>

<h2>
<a id="user-content-license" class="anchor" href="#license" aria-hidden="true"><span aria-hidden="true" class="octicon octicon-link"></span></a>License</h2>

<p><a href="https://creativecommons.org/publicdomain/zero/1.0/"><img src="https://camo.githubusercontent.com/60561947585c982aee67ed3e3b25388184cc0aa3/687474703a2f2f6d6972726f72732e6372656174697665636f6d6d6f6e732e6f72672f70726573736b69742f627574746f6e732f38387833312f7376672f63632d7a65726f2e737667" alt="CC0" data-canonical-src="http://mirrors.creativecommons.org/presskit/buttons/88x31/svg/cc-zero.svg" style="max-width:100%;"></a></p>

<p>To the extent possible under law, <a href="http://sindresorhus.com">Sindre Sorhus</a> has waived all copyright and related or neighboring rights to this work.</p>            
            `;

            // console.log(r);

            var parser = new DOMParser();
            var doc = parser.parseFromString(r, 'text/html');

            var headings = [].slice.call(doc.body.querySelectorAll('h2')),
                $head, children, source, results = [], i = 10;

            headings.forEach(element => {
                $head = jQuery(element);
                children = [].slice.call($head.next().find('a'));

                var $child;
                children.forEach(child => {
                    $child = jQuery(child);
                    
                    results.push({
                        category: $head.text(),
                        name: $child.text(),
                        href: $child.attr('href')
                    });
                });
            });

            results = results.filter(item => (item.category.toLowerCase().indexOf(query) >= 0 || item.name.toLowerCase().indexOf(query) >= 0) && (i--) > 0);

            resolve(results);
        });
    }
}