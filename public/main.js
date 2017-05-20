'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var LoadingGrid = function LoadingGrid() {
    return React.createElement(
        "tr",
        null,
        React.createElement(
            "td",
            { colSpan: "5" },
            React.createElement(
                "div",
                { className: "grid__empty" },
                "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u044E"
            )
        )
    );
};

var Row = function Row(props) {
    return React.createElement(
        "tr",
        null,
        React.createElement(
            "td",
            null,
            props.aphorism._id
        ),
        React.createElement(
            "td",
            null,
            props.aphorism.author
        ),
        React.createElement(
            "td",
            null,
            props.aphorism.text
        ),
        React.createElement(
            "td",
            null,
            React.createElement(
                "a",
                { href: "#" },
                "\u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C"
            )
        ),
        React.createElement(
            "td",
            null,
            React.createElement("a", { href: "#", onClick: function onClick() {
                    props.onDestroy(props.aphorism._id);
                }, dangerouslySetInnerHTML: { __html: "&times;" } })
        )
    );
};

var Grid = function (_React$Component) {
    inherits(Grid, _React$Component);

    function Grid() {
        var _ref;

        var _temp, _this, _ret;

        classCallCheck(this, Grid);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Grid.__proto__ || Object.getPrototypeOf(Grid)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            aphorisms: []
        }, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(Grid, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _this2 = this;

            fetch("/aphorisms").then(function (response) {
                if (response.status == 200) {
                    response.json().then(function (response) {
                        _this2.setState({
                            "aphorisms": response
                        });
                    });
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }, {
        key: "onDestroy",
        value: function onDestroy(id) {
            var _this3 = this;

            fetch("/aphorisms/" + id, {
                method: "DELETE"
            }).then(function (response) {
                if (response.status == 200) {
                    _this3.setState({
                        aphorisms: _this3.state.aphorisms.filter(function (aphorism) {
                            return aphorism._id != id;
                        })
                    });
                }
            }).catch(function (error) {
                return console.log(error);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var content = this.state.aphorisms.length ? this.state.aphorisms.map(function (aphorism) {
                return React.createElement(Row, { key: aphorism._id, aphorism: aphorism, onDestroy: _this4.onDestroy.bind(_this4) });
            }) : React.createElement(LoadingGrid, null);

            return React.createElement(
                "table",
                { className: "grid" },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            "ID"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "\u0410\u0432\u0442\u043E\u0440"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "\u0410\u0444\u043E\u0440\u0438\u0437\u043C"
                        ),
                        React.createElement("th", { colSpan: "2" })
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    content
                )
            );
        }
    }]);
    return Grid;
}(React.Component);

/*
const Layer = (props) => {
    return(
        {props.aphorism._id}
    );
};
*/

var addAphorism = function (_React$component) {
    inherits(addAphorism, _React$component);

    function addAphorism() {
        var _ref;

        var _temp, _this, _ret;

        classCallCheck(this, addAphorism);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = addAphorism.__proto__ || Object.getPrototypeOf(addAphorism)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            aphorisms: []
        }, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(addAphorism, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _this2 = this;

            fetch("/aphorisms").then(function (response) {
                if (response.status == 200) {
                    response.json().then(function (response) {
                        _this2.setState({
                            "aphorism": response
                        });
                    });
                }
            });
        }
    }]);
    return addAphorism;
}(React.component);

var Container = function (_React$Component) {
    inherits(Container, _React$Component);

    function Container() {
        var _ref;

        var _temp, _this, _ret;

        classCallCheck(this, Container);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = Container.__proto__ || Object.getPrototypeOf(Container)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            showMore: false,
            plusAphorism: false
        }, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(Container, [{
        key: "toggleShowMore",
        value: function toggleShowMore() {
            this.setState({
                showMore: !this.state.showMore
            });
        }
    }, {
        key: "addAphorism",
        value: function addAphorism$$1() {
            this.setState({
                plusAphorism: !this.state.plusAphorism
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "div",
                { className: "container" },
                this.props.children,
                React.createElement(
                    "nav",
                    null,
                    React.createElement(
                        "ul",
                        null,
                        React.createElement(
                            "li",
                            null,
                            React.createElement(
                                "a",
                                { href: "#", onClick: function onClick() {
                                        _this2.toggleShowMore();
                                    } },
                                !this.state.showMore ? "Load more" : "Hide"
                            )
                        ),
                        React.createElement(
                            "li",
                            null,
                            React.createElement(
                                "a",
                                { href: "#", onClick: function onClick() {
                                        _this2.addAphorism();
                                    } },
                                !this.state.plusAphorism ? "Add" : "Back"
                            )
                        )
                    )
                ),
                this.state.showMore ? React.createElement(Grid, null) : null,
                this.state.plusAphorism ? React.createElement(addAphorism, null) : null
            );
        }
    }]);
    return Container;
}(React.Component);

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(React.createElement(
        Container,
        null,
        React.createElement(
            'h1',
            null,
            '\u0421\u043F\u0438\u0441\u043E\u043A \u0430\u0444\u043E\u0440\u0438\u0437\u043C\u043E\u0432'
        )
    ), document.getElementById('root'));
}, false);
