

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

URL = {
    SOURCE: 'animehay',
    DOMAIN: "http://animehay.tv",
    HEADERS: function HEADERS() {
        var rerfer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        return {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Host': 'animehay.tv',
            'Referer': rerfer,
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        };
    },
    HEADER_SCRIPT: function HEADER_SCRIPT() {
        var cookie = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var rerfer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        return {
            'Accept': '*/*',
            'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
            'Connection': 'keep-alive',
            'Cookie': cookie,
            'Referer': rerfer,
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        };
    },
    SEARCH: function SEARCH(title) {
        return 'http://animehay.tv/tim-kiem?q=' + encodeURI(title);
    }
};

var Animehay = function () {
    function Animehay(props) {
        _classCallCheck(this, Animehay);

        this.libs = props.libs;
        this.movieInfo = props.movieInfo;
        this.settings = props.settings;
        this.state = {};
    }

    _createClass(Animehay, [{
        key: 'searchDetail',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _libs, httpRequest, cheerio, stringHelper, _movieInfo, title, year, season, episode, type, banhtv, detailUrl, arrVideo, videoUrl, tvshowVideoUrl, url_search, html_search, $, item_page, htmlVideo, $_2, linkDetail, listEpisode;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _libs = this.libs, httpRequest = _libs.httpRequest, cheerio = _libs.cheerio, stringHelper = _libs.stringHelper;
                                _movieInfo = this.movieInfo, title = _movieInfo.title, year = _movieInfo.year, season = _movieInfo.season, episode = _movieInfo.episode, type = _movieInfo.type;
                                banhtv = this;
                                detailUrl = false;
                                arrVideo = [];
                                videoUrl = false;
                                tvshowVideoUrl = false;

                                if (!(type == 'movie')) {
                                    _context.next = 9;
                                    break;
                                }

                                throw new Error('NOT FOUND');

                            case 9:
                                url_search = URL.SEARCH(title);
                                _context.next = 12;
                                return httpRequest.getHTML(url_search, URL.HEADERS(url_search));

                            case 12:
                                html_search = _context.sent;
                                $ = cheerio.load(html_search);
                                item_page = $('.ah-row-film .ah-col-film');


                                item_page.each(function () {

                                    var hrefVideo = $(this).find('.ah-effect-film a').attr('href');
                                    var title_en = $(this).find('.name-film').text();
                                    var seasonMovie = title_en.match(/ss([0-9]+)/i);
                                    seasonMovie = seasonMovie != null ? +seasonMovie[1] : 0;
                                    title_en = title_en.replace(/ss[0-9]+/i, '');

                                    if (stringHelper.shallowCompare(title_en, title)) {
                                        videoUrl = hrefVideo;
                                        return;
                                    }
                                });

                                if (!(type == 'tv' && videoUrl != false)) {
                                    _context.next = 29;
                                    break;
                                }

                                _context.next = 19;
                                return httpRequest.getHTML(videoUrl, URL.HEADERS());

                            case 19:
                                htmlVideo = _context.sent;
                                $_2 = cheerio.load(htmlVideo);
                                linkDetail = $_2('.button-one').attr('href');

                                if (!linkDetail) {
                                    _context.next = 29;
                                    break;
                                }

                                _context.next = 25;
                                return httpRequest.getHTML(linkDetail, URL.HEADERS());

                            case 25:
                                htmlVideo = _context.sent;

                                $_2 = cheerio.load(htmlVideo);

                                listEpisode = $_2('.ah-wf-le ul li');


                                listEpisode.each(function () {
                                    var numberEpisode = $_2(this).find('a').text();
                                    var hrefEpisode = $_2(this).find('a').attr('href');

                                    if (hrefEpisode && numberEpisode == episode) {
                                        detailUrl = hrefEpisode;
                                        return;
                                    }
                                });

                            case 29:

                                this.state.detailUrl = detailUrl;
                                return _context.abrupt('return');

                            case 31:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function searchDetail() {
                return _ref.apply(this, arguments);
            }

            return searchDetail;
        }()
    }, {
        key: 'getHostFromDetail',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _libs2, httpRequest, cheerio, qs, gibberish, _movieInfo2, episode, type, animehay, hosts, infoLoad, serverLoad, loadVideo, loadVideo2, html_video, headers, $, cookie, hrefScript, script, item, _item, item2;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _libs2 = this.libs, httpRequest = _libs2.httpRequest, cheerio = _libs2.cheerio, qs = _libs2.qs, gibberish = _libs2.gibberish;
                                _movieInfo2 = this.movieInfo, episode = _movieInfo2.episode, type = _movieInfo2.type;

                                if (this.state.detailUrl) {
                                    _context2.next = 4;
                                    break;
                                }

                                throw new Error("NOT_FOUND");

                            case 4:
                                animehay = this;
                                hosts = [];
                                infoLoad = {
                                    links: []
                                };
                                serverLoad = {};

                                loadVideo = function loadVideo(a, b, c, d, e) {};

                                loadVideo2 = function loadVideo2(a, b, c, d, e) {};

                                _context2.next = 12;
                                return httpRequest.get(this.state.detailUrl, URL.HEADERS());

                            case 12:
                                html_video = _context2.sent;
                                headers = html_video.headers['set-cookie'];
                                $ = cheerio.load(html_video.data);
                                cookie = headers[0].replace(/\;.*/i, '') + ';';
                                hrefScript = $('.ah-wf-head script[async=true]').attr('src');
                                _context2.next = 19;
                                return httpRequest.getHTML(hrefScript, URL.HEADER_SCRIPT(cookie, animehay.state.detailUrl));

                            case 19:
                                script = _context2.sent;


                                script = script.replace(/var *infoLoad/i, 'infoLoad');
                                script = script.replace(/var *serverLoad/i, 'serverLoad');

                                eval(script);

                                if (infoLoad.links.length > 0) {

                                    for (item in infoLoad.links) {
                                        if (infoLoad.links[item].file) {
                                            hosts.push({
                                                provider: {
                                                    url: animehay.state.detailUrl,
                                                    name: "Server 7"
                                                },
                                                result: {
                                                    file: infoLoad.links[item].file,
                                                    label: infoLoad.links[item].label
                                                }
                                            });
                                        }
                                    }
                                }

                                if (serverLoad) {

                                    for (_item in serverLoad) {

                                        for (item2 in serverLoad[_item]) {

                                            if (serverLoad[_item][item2].file) {
                                                hosts.push({
                                                    provider: {
                                                        url: animehay.state.detailUrl,
                                                        name: "Server 7"
                                                    },
                                                    result: {
                                                        file: serverLoad[_item][item2].file,
                                                        label: serverLoad[_item][item2].label
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }

                                // let playerSetting = {
                                //     sourceLinks: [],
                                //     modelId: ''
                                // };

                                // let html_video  = await httpRequest.getHTML(banhtv.state.detailUrl);

                                // let player      = html_video.match(/var *playerSetting *\=([^$]+)/i);
                                // player      = player != null ? player[1] : '';
                                // player      = player.replace(/var *bbPlayer\;/i, '');
                                // player      = player.replace(/var *playerNoAds *\= *function\(\) *\{/i, '');
                                // player      = player.replace('playerSetting["adsArray"] = [];', '');
                                // player      = player.replace('playerSetting["midArray"] = [];', '');
                                // player      = player.replace(`bbPlayer = new BPlayer('player');`, '');
                                // player      = player.replace(`bbPlayer.init(playerSetting);`, '');
                                // player      = player.replace(`$(".ads-under-player").remove();`, '');
                                // player      = player.replace(/\}$/i, '');
                                // player      = player.replace('var playerHasAds = function() {', '');
                                // player      = player.replace(`bbPlayer = new BPlayer('player');`, '');
                                // player      = player.replace(`bbPlayer.init(playerSetting);`, '');
                                // player      = player.replace(/\}$/i, '');
                                // player      = player.replace('hook_no_play_ads.push(playerNoAds);', '');
                                // player      = player.replace('hook_play_ads.push(playerHasAds);', '');

                                // eval(`playerSetting =  ${player}`);


                                // let key = `banhtv.com4590481877${playerSetting.modelId}`;
                                // for( let item in playerSetting.sourceLinks ) {

                                //     for( let item1 in playerSetting.sourceLinks[item].links ) {

                                //         let link_direct = gibberish.dec(playerSetting.sourceLinks[item].links[item1].file, key);

                                //         if( link_direct ) {

                                //         	hosts.push({
                                //                 provider: {
                                //                     url: banhtv.state.detailUrl,
                                //                     name: "Server 5"
                                //                 },
                                //                 result: {
                                //                     file: link_direct,
                                //                     label: playerSetting.sourceLinks[item].links[item1].label
                                //                 }
                                //             });
                                //         }

                                //     }

                                // }

                                this.state.hosts = hosts;
                                return _context2.abrupt('return');

                            case 27:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getHostFromDetail() {
                return _ref2.apply(this, arguments);
            }

            return getHostFromDetail;
        }()
    }]);

    return Animehay;
}();

thisSource.function = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(libs, movieInfo, settings) {
        var anime;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        anime = new Animehay({
                            libs: libs,
                            movieInfo: movieInfo,
                            settings: settings
                        });
                        _context3.next = 3;
                        return anime.searchDetail();

                    case 3:
                        _context3.next = 5;
                        return anime.getHostFromDetail();

                    case 5:
                        return _context3.abrupt('return', anime.state.hosts);

                    case 6:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x4, _x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();