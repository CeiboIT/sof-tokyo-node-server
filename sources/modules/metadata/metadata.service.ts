/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../connection/connection.service.ts" />

import Q = require("q");
import connection = require('../connection/connection.service')

export interface IMetadataService {
    // GET
    getSubcategories0List(): Q.IPromise<{}>;
    getSubcategories1List(): Q.IPromise<{}>;
    getSchoolsList(): Q.IPromise<{}>;
    getStylesList(): Q.IPromise<{}>;
    getSchoolByMemberId(memberId): Q.IPromise<{}>;
    getProductMetadata(productId): Q.IPromise<{}>;
    getProductUniqueVisits(productId): Q.IPromise<{}>;
    getProductTotalVisits(productId): Q.IPromise<{}>;

    // POST
    createProductLike(productId): Q.IPromise<{}>;
    createProductImage(productId, field, value): Q.IPromise<{}>;
}


export class MetadataService implements IMetadataService {
    private db = connection.service;

    getSubcategories0List(): Q.IPromise<{}> {
        var _listPromise = Q.defer();

        var subcategories0 = [
            {id: 1, name: 'tops', trad: 'トップス'},
            {id: 2, name: 'jacket_outer', trad: 'ジャケット/アウター'},
            {id: 3, name: 'pants', trad: 'パンツ'},
            {id: 4, name: 'skirt', trad: 'スカート'},
            {id: 5, name: 'onepiece', trad: 'ワンピース/ドレス'},
            {id: 6, name: 'setup', trad: 'セットアップ'},
            {id: 7, name: 'total_code', trad: 'トータルコーデ'},
            {id: 8, name: 'shoes', trad: 'シューズ'},
            {id: 9, name: 'goods', trad: 'ファッショングッズ'}
        ];
        _listPromise.resolve(subcategories0);
/*
        this.db.query_db("SELECT DISTINCT meta_value AS value FROM wp2_postmeta WHERE meta_key = 'sofbackend__sof_work_meta__category_0'")
            .then((data) => {
                _listPromise.resolve(data);
            })
*/
        return _listPromise.promise;
    }

    getSubcategories1List(): Q.IPromise<{}> {
        var _listPromise = Q.defer();

        var subcategories1 = [
            {id: 1, parent: 1, name: 't_shirt', trad: 'Tシャツ/カットソー'},
            {id: 2, parent: 1, name: 'shirt', trad: 'シャツ/ブラウス'},
            {id: 3, parent: 1, name: 'proshirt', trad: 'ポロシャツ'},
            {id: 4, parent: 1, name: 'knit', trad: 'ニット/セーター'},
            {id: 5, parent: 1, name: 'vest', trad: 'ベスト'},
            {id: 6, parent: 1, name: 'parka', trad: 'パーカー'},
            {id: 7, parent: 1, name: 'sweat', trad: 'スウェット'},
            {id: 8, parent: 1, name: 'cardigan', trad: 'カーディガン'},
            {id: 9, parent: 1, name: 'tank_tops', trad: 'タンクトップ'},
            {id: 10, parent: 1, name: 'other_tops', trad: 'その他のトップス'},
            {id: 11, parent: 2, name: 'jacket', trad: 'ジャケット'},
            {id: 12, parent: 2, name: 'leather_jacket', trad: 'レザージャケット'},
            {id: 13, parent: 2, name: 'military_jacket', trad: 'ミリタリージャケット'},
            {id: 14, parent: 2, name: 'blouson', trad: 'ブルゾン'},
            {id: 15, parent: 2, name: 'chester_coat', trad: 'チェスターコート'},
            {id: 16, parent: 2, name: 'trench_coat', trad: 'トレンチコート'},
            {id: 17, parent: 2, name: 'stand-collar_coat', trad: 'ステンカラーコート'},
            {id: 18, parent: 2, name: 'mods_coat', trad: 'モッズコート'},
            {id: 19, parent: 2, name: 'pea_coat', trad: 'ピーコート'},
            {id: 20, parent: 2, name: 'duffle_coat', trad: 'ダッフルコート'},
            {id: 21, parent: 2, name: 'down_jacket', trad: 'ダウンジャケット'},
            {id: 22, parent: 2, name: 'other_jacket_outer', trad: 'その他のジャケット/アウター'},
            {id: 23, parent: 3, name: 'pants', trad: 'パンツ'},
            {id: 24, parent: 3, name: 'wide_pants', trad: 'ワイドパンツ'},
            {id: 25, parent: 3, name: 'slim_pants', trad: 'スリムパンツ'},
            {id: 26, parent: 3, name: 'slax', trad: 'スラックス'},
            {id: 27, parent: 3, name: 'denim', trad: 'デニム'},
            {id: 28, parent: 3, name: 'short_pants', trad: 'ショートパンツ'},
            {id: 29, parent: 3, name: 'leather_pants', trad: 'レザーパンツ'},
            {id: 30, parent: 3, name: 'chino_pants', trad: 'チノパンツ'},
            {id: 31, parent: 3, name: 'other_pants', trad: 'その他のパンツ'},
            {id: 32, parent: 4, name: 'skirt', trad: 'スカート'},
            {id: 33, parent: 4, name: 'tight_skirt', trad: 'タイトスカート'},
            {id: 34, parent: 4, name: 'long_skirt', trad: 'ロングスカート'},
            {id: 35, parent: 4, name: 'flare_skirt', trad: 'フレアスカート'},
            {id: 36, parent: 4, name: 'peplum_skirt', trad: 'ペプラムスカート'},
            {id: 37, parent: 4, name: 'pleats_skirt', trad: 'プリーツスカート'},
            {id: 38, parent: 4, name: 'culottes_skirt', trad: 'キュロットスカート'},
            {id: 39, parent: 4, name: 'gored_skirt', trad: 'ゴアードスカート'},
            {id: 40, parent: 4, name: 'tiered_skirt', trad: 'ティアードスカート'},
            {id: 41, parent: 4, name: 'other_skirt', trad: 'その他のスカート'},
            {id: 42, parent: 5, name: 'onepiece', trad: 'ワンピース'},
            {id: 43, parent: 5, name: 'shirt_onepiece', trad: 'シャツワンピース'},
            {id: 44, parent: 5, name: 'maxi_onepiece', trad: 'マキシワンピース'},
            {id: 45, parent: 5, name: 'tunic', trad: 'チュニック'},
            {id: 46, parent: 5, name: 'dress', trad: 'ドレス'},
            {id: 47, parent: 5, name: 'wedding_dress', trad: 'ウェディングドレス'},
            {id: 48, parent: 5, name: 'other_onepiece', trad: 'その他のワンピース/ドレス'},
            {id: 49, parent: 6, name: 'setup', trad: 'セットアップ'},
            {id: 50, parent: 7, name: 'total_code', trad: 'トータルコーデ'},
            {id: 51, parent: 8, name: 'sneaker', trad: 'スニーカー'},
            {id: 52, parent: 8, name: 'dress_shoes', trad: 'ドレスシューズ'},
            {id: 53, parent: 8, name: 'pumps', trad: 'パンプス'},
            {id: 54, parent: 8, name: 'boots', trad: 'ブーツ'},
            {id: 55, parent: 8, name: 'long_boots', trad: 'ロングブーツ'},
            {id: 56, parent: 8, name: 'sandal', trad: 'サンダル'},
            {id: 57, parent: 8, name: 'rain_shoes', trad: 'レインシューズ'},
            {id: 58, parent: 8, name: 'other_shoes', trad: 'その他のシューズ'},
            {id: 59, parent: 9, name: 'hat', trad: '帽子'},
            {id: 60, parent: 9, name: 'watch', trad: '時計'},
            {id: 61, parent: 9, name: 'bag', trad: 'バッグ'},
            {id: 62, parent: 9, name: 'totes_bag', trad: 'トートバッグ'},
            {id: 63, parent: 9, name: 'backpack', trad: 'バックパック/リュック'},
            {id: 64, parent: 9, name: 'boston_bag', trad: 'ボストンバッグ'},
            {id: 65, parent: 9, name: 'clutch_bag', trad: 'クラッチバッグ'},
            {id: 66, parent: 9, name: 'west_bag', trad: 'ウエストバッグ'},
            {id: 67, parent: 9, name: 'jewelry', trad: 'ジュエリー'}
        ];
        _listPromise.resolve(subcategories1);
/*
        this.db.query_db("SELECT DISTINCT meta_value AS value FROM wp2_postmeta WHERE meta_key = 'sofbackend__sof_work_meta__category_1'")
            .then((data) => {
                _listPromise.resolve(data);
            })
*/
        return _listPromise.promise;
    }

    getSchoolsList(): Q.IPromise<{}> {
        var _listPromise = Q.defer();
        this.db.query_db("SELECT DISTINCT value FROM wp2_bp_xprofile_data WHERE field_id=4")
            .then((data) => {
                _listPromise.resolve(data);
            })
        return _listPromise.promise;
    }

    getStylesList(): Q.IPromise<{}> {
        var _listPromise = Q.defer();

        var styles = [
            {id: 1, name: "simple", trad: "シンプル"},
            {id: 2, name: "casual", trad: "カジュアル"},
            {id: 3, name: "feminine", trad: "フェミニン"},
            {id: 4, name: "mode", trad: "モード"},
            {id: 5, name: "street", trad: "ストリート"},
            {id: 6, name: "art", trad: "アート"},
            {id: 7, name: "elegance", trad: "エレガンス"},
            {id: 8, name: "classic", trad: "クラシック"},
            {id: 9, name: "sporty", trad: "スポーティ"},
            {id: 10, name: "oriental", trad: "オリエンタル"},
            {id: 11, name: "decora", trad: "デコラ"},
            {id: 12, name: "hippy_country", trad: "ヒッピー/カントリー"},
            {id: 13, name: "x_gender", trad: "クロスジェンダー"},
            {id: 14, name: "manish", trad: "マニッシュ"},
            {id: 15, name: "preppy", trad: "フレッピー"},
            {id: 16, name: "military", trad: "ミリタリー"},
            {id: 17, name: "rock", trad: "ロック"},
            {id: 18, name: "lolita", trad: "ロリータ"},
            {id: 19, name: "sexy_dandy", trad: "セクシィ/ダンディ"},
            {id: 20, name: "ethnic", trad: "エスニック"},
            {id: 21, name: "future", trad: "フューチャー"},
            {id: 22, name: "other", trad: "該当なし"}
        ]
/*
        this.db.query_db("SELECT DISTINCT meta_value AS value FROM wp2_postmeta WHERE meta_key = 'sofbackend__sof_work_meta__style'")
            .then((data) => {
                _listPromise.resolve(data);
            })
*/
        return _listPromise.promise;
    }

    getSchoolByMemberId(memberId): Q.IPromise<{}> {
        var _promise = Q.defer();
        this.db.query_db("SELECT value FROM wp2_bp_xprofile_data WHERE field_id=4 AND user_id=" + memberId)
            .then((data) => {
                _promise.resolve(data);
            })
        return _promise.promise;
    }

    getProductMetadata(productId): Q.IPromise<{}> {
        var _promise = Q.defer();
        var query = "(SELECT A.meta_key AS field, A.meta_value AS value " +
                    "FROM wp2_postmeta A " +
                    "WHERE A.post_id=" + productId + " AND A.meta_key <> 'visit') " +
                    "UNION " +
                    "(SELECT B.meta_key AS field, COUNT(DISTINCT B.meta_value) AS value " +
                    "FROM wp2_postmeta B " +
                    "WHERE B.meta_key = 'visit' AND B.post_id=" + productId + ")";
        this.db.query_db(query)
            .then((data) => {
                _promise.resolve(data);
            })
        return _promise.promise;
    }

    createProductLike(productId): Q.IPromise<{}> {
        var _promise = Q.defer();
        this.db.query_db("UPDATE wp2_postmeta SET meta_value = meta_value + 1 WHERE meta_key='_item_likes' AND post_id=" + productId)
            .then((data) => {
                _promise.resolve(data);
            })
        return _promise.promise;
    }

    getProductUniqueVisits(productId): Q.IPromise<{}> {
        var _promise = Q.defer();
        this.db.query_db("SELECT COUNT(DISTINCT meta_value) AS value FROM wp2_postmeta WHERE meta_key = 'visit' AND post_id=" + productId)
            .then((data) => {
                _promise.resolve(data);
            })
        return _promise.promise;
    }

    getProductTotalVisits(productId): Q.IPromise<{}> {
        var _promise = Q.defer();
        this.db.query_db("SELECT COUNT(meta_value) AS value FROM wp2_postmeta WHERE meta_key = 'visit' AND post_id=" + productId)
            .then((data) => {
                _promise.resolve(data);
            })
        return _promise.promise;
    }

    createProductImage(productId, field, value): Q.IPromise<{}> {
        var _promise = Q.defer();
        this.db.query_db("INSERT INTO wp2_postmeta (meta_id, post_id, meta_key, meta_value) VALUES (NULL," + productId + ",'" + field + "','" + value + "')")
            .then((data) => {
                _promise.resolve(data);
            })
        return _promise.promise;
    }

};
