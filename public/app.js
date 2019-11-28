var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var Todo = function (_React$Component) {
    _inherits(Todo, _React$Component);

    function Todo(props) {
        _classCallCheck(this, Todo);

        var _this = _possibleConstructorReturn(this, (Todo.__proto__ || Object.getPrototypeOf(Todo)).call(this, props));

        _this.state = {
            done: props.done,
            text: props.text
        };

        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);

        console.log(props);
        return _this;
    }

    _createClass(Todo, [{
        key: "handleSubmit",
        value: function handleSubmit(event) {
            var _this2 = this;

            var id = this.props.id || this.state.id;
            if (id == "" || id == undefined) {
                fetch('/todos/', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        text: this.state.text,
                        done: this.state.done
                    })
                }).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    return _this2.setState({ _id: data.id });
                });
            } else {
                fetch("/todos/" + id, {
                    method: 'put',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ done: this.state.done, text: this.state.text })
                });
            }
        }
    }, {
        key: "handleClick",
        value: function handleClick(event) {
            var _this3 = this;

            this.setState(function (state) {
                return { done: !state.done };
            }, function (event) {
                _this3.handleSubmit(event);
            });
        }
    }, {
        key: "handleChange",
        value: function handleChange(event) {
            var text = event.target.value;
            this.setState({ text: text });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "todo" },
                React.createElement(
                    "span",
                    null,
                    React.createElement("input", { type: "checkbox", checked: this.state.done, onClick: this.handleClick }),
                    React.createElement("input", { type: "text", value: this.state.text,
                        onChange: this.handleChange, onBlur: this.handleSubmit,
                        className: this.state.done ? "done" : "not_done"
                    })
                )
            );
        }
    }]);

    return Todo;
}(React.Component);

var TodoList = function (_React$Component2) {
    _inherits(TodoList, _React$Component2);

    function TodoList(props) {
        _classCallCheck(this, TodoList);

        var _this4 = _possibleConstructorReturn(this, (TodoList.__proto__ || Object.getPrototypeOf(TodoList)).call(this, props));

        _this4.state = {
            todos: []
        };
        _this4.newTodo = _this4.newTodo.bind(_this4);
        return _this4;
    }

    _createClass(TodoList, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this5 = this;

            console.log("Wena waxo");
            fetch('/todos/').then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data.todos);
                _this5.setState({ todos: data.todos });
            });
        }
    }, {
        key: "newTodo",
        value: function newTodo(event) {
            event.preventDefault();
            todos = this.state.todos;
            todos.push({ _id: '' });

            this.setState(function (state) {
                return {
                    todos: todos
                };
            });
        }
    }, {
        key: "render",
        value: function render() {
            var todoList = this.state.todos.map(function (todo) {
                return React.createElement(Todo, { id: todo._id, Key: todo._id.toString(),
                    text: todo.text, done: todo.done });
            });
            return React.createElement(
                React.Fragment,
                null,
                todoList,
                React.createElement(
                    "a",
                    { href: "#", onClick: this.newTodo },
                    "New Todo"
                )
            );
        }
    }]);

    return TodoList;
}(React.Component);

ReactDOM.render(React.createElement(TodoList, null), document.getElementById('root'));