// To parse this data:
//
//   import { Convert, Search } from "./file";
//
//   const search = Convert.toSearch(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Search {
    page:          number;
    results:       Result[];
    total_pages:   number;
    total_results: number;
}

export interface Result {
    adult?:                boolean;
    gender?:               number;
    id:                    number;
    known_for?:            Result[];
    known_for_department?: string;
    media_type:            MediaType;
    name?:                 string;
    popularity?:           number;
    profile_path?:         null | string;
    backdrop_path?:        null | string;
    genre_ids?:            number[];
    original_language?:    OriginalLanguage;
    original_title?:       string;
    overview?:             string;
    poster_path?:          null | string;
    release_date?:         string;
    title?:                string;
    video?:                boolean;
    vote_average?:         number;
    vote_count?:           number;
    first_air_date?:       Date;
    origin_country?:       string[];
    original_name?:        string;
}

export enum MediaType {
    Movie = "movie",
    Person = "person",
    Tv = "tv",
}

export enum OriginalLanguage {
    En = "en",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toSearch(json: string): Search {
        return cast(JSON.parse(json), r("Search"));
    }

    public static searchToJson(value: Search): string {
        return JSON.stringify(uncast(value, r("Search")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Search": o([
        { json: "page", js: "page", typ: 0 },
        { json: "results", js: "results", typ: a(r("Result")) },
        { json: "total_pages", js: "total_pages", typ: 0 },
        { json: "total_results", js: "total_results", typ: 0 },
    ], false),
    "Result": o([
        { json: "adult", js: "adult", typ: u(undefined, true) },
        { json: "gender", js: "gender", typ: u(undefined, 0) },
        { json: "id", js: "id", typ: 0 },
        { json: "known_for", js: "known_for", typ: u(undefined, a(r("Result"))) },
        { json: "known_for_department", js: "known_for_department", typ: u(undefined, "") },
        { json: "media_type", js: "media_type", typ: r("MediaType") },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "popularity", js: "popularity", typ: u(undefined, 3.14) },
        { json: "profile_path", js: "profile_path", typ: u(undefined, u(null, "")) },
        { json: "backdrop_path", js: "backdrop_path", typ: u(undefined, u(null, "")) },
        { json: "genre_ids", js: "genre_ids", typ: u(undefined, a(0)) },
        { json: "original_language", js: "original_language", typ: u(undefined, r("OriginalLanguage")) },
        { json: "original_title", js: "original_title", typ: u(undefined, "") },
        { json: "overview", js: "overview", typ: u(undefined, "") },
        { json: "poster_path", js: "poster_path", typ: u(undefined, u(null, "")) },
        { json: "release_date", js: "release_date", typ: u(undefined, "") },
        { json: "title", js: "title", typ: u(undefined, "") },
        { json: "video", js: "video", typ: u(undefined, true) },
        { json: "vote_average", js: "vote_average", typ: u(undefined, 3.14) },
        { json: "vote_count", js: "vote_count", typ: u(undefined, 0) },
        { json: "first_air_date", js: "first_air_date", typ: u(undefined, Date) },
        { json: "origin_country", js: "origin_country", typ: u(undefined, a("")) },
        { json: "original_name", js: "original_name", typ: u(undefined, "") },
    ], false),
    "MediaType": [
        "movie",
        "person",
        "tv",
    ],
    "OriginalLanguage": [
        "en",
    ],
};
