function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally {
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally {
            if (_d) throw _e;
        }
    }
    return _arr;
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

import {
    LOCATION_CHANGE
} from './actions';
/**
 * Adds query to location.
 * Utilises the search prop of location to construct query.
 */

var injectQuery = function injectQuery(location) {
    var searchQuery = location && location.search;

    if (typeof searchQuery !== 'string' || searchQuery.length === 0) {
        return _objectSpread({}, location, {
            query: {}
        });
    } // Ignore the `?` part of the search string e.g. ?username=codejockie


    var search = searchQuery.substring(1); // Split the query string on `&` e.g. ?username=codejockie&name=Kennedy

    var queries = search.split('&'); // Contruct query

    var query = queries.reduce(function(acc, currentQuery) {
        // Split on `=`, to get key and value
        var _currentQuery$split = currentQuery.split('='),
            _currentQuery$split2 = _slicedToArray(_currentQuery$split, 2),
            queryKey = _currentQuery$split2[0],
            queryValue = _currentQuery$split2[1];

        return _objectSpread({}, acc, _defineProperty({}, queryKey, queryValue));
    }, {});
    return _objectSpread({}, location, {
        query: query
    });
};

var createConnectRouter = function createConnectRouter(structure) {
    var fromJS = structure.fromJS,
        merge = structure.merge;

    var createRouterReducer = function createRouterReducer(history) {
        var initialRouterState = fromJS({
            location: injectQuery(history.location),
            action: history.action
        });
        /*
         * This reducer will update the state with the most recent location history
         * has transitioned to.
         */

        return function() {
            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialRouterState;

            var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                type = _ref.type,
                payload = _ref.payload;

            if (type === LOCATION_CHANGE) {
                var location = payload.location,
                    action = payload.action,
                    isFirstRendering = payload.isFirstRendering; // Don't update the state ref for the first rendering
                // to prevent the double-rendering issue on initilization

                return isFirstRendering ? state : merge(state, {
                    location: fromJS(injectQuery(location)),
                    action: action
                });
            }

            return state;
        };
    };

    return createRouterReducer;
};

export default createConnectRouter;