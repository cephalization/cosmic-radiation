var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainComponent = function (_React$Component) {
  _inherits(MainComponent, _React$Component);

  function MainComponent(props) {
    _classCallCheck(this, MainComponent);

    var _this = _possibleConstructorReturn(this, (MainComponent.__proto__ || Object.getPrototypeOf(MainComponent)).call(this, props));

    _this.render = function () {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { id: 'selectors' },
          React.createElement(
            'button',
            { type: 'button', onClick: _this.handleStaticMode },
            'Square Tile Pattern'
          ),
          React.createElement(
            'button',
            { type: 'button', onClick: _this.handleBlastMode },
            'Sin Blast Pattern'
          ),
          React.createElement(
            'button',
            { type: 'button', onClick: function onClick() {
                return _this.setState({ mode: 'follow' });
              } },
            'Follow Mouse'
          ),
          React.createElement(
            'label',
            null,
            ' Click mode: ',
            _this.state.clickMode,
            React.createElement('input', { type: 'radio', value: 'sin', checked: 'sin' === _this.state.clickMode, onChange: _this.handleClickModeChange }),
            React.createElement('input', { type: 'radio', value: 'circle', checked: 'circle' === _this.state.clickMode, onChange: _this.handleClickModeChange })
          ),
          React.createElement(
            'button',
            { type: 'button', onClick: _this.handleClearCanvas },
            'Clear'
          ),
          React.createElement(
            'label',
            null,
            ' Color Width: ',
            _this.state.colorWidth,
            React.createElement('input', { type: 'range', step: '1', value: _this.state.colorWidth, min: '0', max: '255', onChange: _this.handleWidthChange })
          ),
          React.createElement(
            'label',
            null,
            ' Pixel Size: ',
            _this.state.pixelSize,
            React.createElement('input', { type: 'range', step: '.1', value: _this.state.pixelSize, min: '1', max: '10', onChange: _this.handlePixelChange })
          ),
          React.createElement(
            'label',
            null,
            ' Pen Size: ',
            _this.state.penSize,
            React.createElement('input', { type: 'range', step: '1', value: _this.state.penSize, min: '1', max: '100', onChange: _this.handlePenChange })
          )
        ),
        React.createElement('canvas', {
          id: 'canvas',
          ref: _this.canvas,
          height: window.innerHeight + 'px',
          width: window.innerWidth + 'px',
          onClick: _this.handleClickCanvas,
          onMouseMove: _this.state.mode === 'follow' ? function (e) {
            return _this.handleFollowMode(e);
          } : function () {}
        })
      );
    };

    _this.state = _this.getInitState();
    // Setup a reference to DOM
    _this.canvas = React.createRef();

    _this.handleStaticMode = _this.handleStaticMode.bind(_this);
    _this.handleBlastMode = _this.handleBlastMode.bind(_this);
    _this.handleFollowMode = _this.handleFollowMode.bind(_this);
    _this.handleClearCanvas = _this.handleClearCanvas.bind(_this);
    _this.handleClickCanvas = _this.handleClickCanvas.bind(_this);
    _this.handleWidthChange = _this.handleWidthChange.bind(_this);
    _this.handlePixelChange = _this.handlePixelChange.bind(_this);
    _this.handlePenChange = _this.handlePenChange.bind(_this);
    _this.handleClickModeChange = _this.handleClickModeChange.bind(_this);
    return _this;
  }

  _createClass(MainComponent, [{
    key: 'getInitState',
    value: function getInitState() {
      return {
        mode: null,
        colorWidth: 255,
        pixelSize: 1,
        penSize: 10,
        clickMode: 'sin'
      };
    }
  }, {
    key: 'handleFollowMode',
    value: function handleFollowMode(e) {
      this.followCosmicWaveGenerator(this.canvas.current, e.clientX, e.clientY);
    }
  }, {
    key: 'handleStaticMode',
    value: function handleStaticMode() {
      this.setState({ mode: 'static' }, this.staticCosmicWaveGenerator(this.canvas.current));
    }
  }, {
    key: 'handleBlastMode',
    value: function handleBlastMode(e) {
      var _this2 = this;

      e.persist();
      this.setState({ mode: 'blast' }, function () {
        var canvas = _this2.canvas.current;
        for (var x = 0; x < canvas.width; x++) {
          for (var y = 0; y < canvas.height; y++) {
            _this2.cosmicSinGenerator(canvas, x, y, 0, 0);
          }
        }
      });
    }
  }, {
    key: 'handleClearCanvas',
    value: function handleClearCanvas() {
      this.setState(this.getInitState(), this.canvas.current.getContext('2d').clearRect(0, 0, this.canvas.current.width, this.canvas.current.height));
    }
  }, {
    key: 'handleClickCanvas',
    value: function handleClickCanvas(e) {
      switch (this.state.clickMode) {
        case 'sin':
          this.cosmicSinGenerator(this.canvas.current, e.clientX, e.clientY, 100, 50);
          break;
        case 'circle':
          this.clickCosmicWaveGenerator(this.canvas.current, e.clientX, e.clientY);
          break;
        default:
          break;
      }
    }
  }, {
    key: 'handleWidthChange',
    value: function handleWidthChange(e) {
      this.setState({ colorWidth: e.target.value });
    }
  }, {
    key: 'handlePixelChange',
    value: function handlePixelChange(e) {
      this.setState({ pixelSize: e.target.value });
    }
  }, {
    key: 'handlePenChange',
    value: function handlePenChange(e) {
      this.setState({ penSize: e.target.value });
    }
  }, {
    key: 'handleClickModeChange',
    value: function handleClickModeChange(e) {
      this.setState({ clickMode: e.target.value });
    }
  }, {
    key: 'staticCosmicWaveGenerator',
    value: function staticCosmicWaveGenerator(canvas) {
      var context = canvas.getContext('2d');
      var colorWidth = this.state.colorWidth;
      var pixelSize = this.state.pixelSize;

      for (var i = 0; i < canvas.height; i++) {
        for (var j = 0; j < canvas.width; j++) {
          context.fillStyle = 'rgb(' + Math.floor(i % colorWidth) + ', ' + Math.floor(j % colorWidth) + ', ' + Math.floor(i * j % colorWidth) + ')';
          context.fillRect(j * pixelSize, i * pixelSize, pixelSize, pixelSize);
        }
      }
    }
  }, {
    key: 'followCosmicWaveGenerator',
    value: function followCosmicWaveGenerator(canvas, x, y) {
      var context = canvas.getContext('2d');
      var colorWidth = this.state.colorWidth;
      var penSize = this.state.penSize;

      context.fillStyle = 'rgb(' + Math.floor(x % colorWidth) + ', ' + Math.floor(y % colorWidth) + ', ' + Math.floor(x * y % colorWidth) + ')';
      context.fillRect(x, y, penSize, penSize);
    }
  }, {
    key: 'cosmicSinGenerator',
    value: function cosmicSinGenerator(canvas, x, y, xDelta, yDelta) {
      var context = canvas.getContext('2d');
      var colorWidth = this.state.colorWidth;
      var pixelSize = this.state.pixelSize;

      for (var i = y; i <= y + yDelta; i++) {
        for (var j = x; j <= x + xDelta; j++) {
          context.fillStyle = 'rgb(' + Math.floor(i % colorWidth) + ', ' + Math.floor(j % colorWidth) + ', ' + Math.floor(i * j % colorWidth) + ')';
          context.fillRect(j, i + 75 * Math.sin(j * .1), 1, 1);
        }
      }
    }
  }, {
    key: 'clickCosmicWaveGenerator',
    value: function clickCosmicWaveGenerator(canvas, x, y) {
      var context = canvas.getContext('2d');
      var colorWidth = this.state.colorWidth;
      var pixelSize = this.state.pixelSize;
      var penSize = this.state.penSize;

      for (var i = 0; i < canvas.width; i++) {
        for (var j = 0; j < canvas.height; j++) {
          var distanceFromOrigin = Math.sqrt((i - x) * (i - x) + (j - y) * (j - y));
          var distanceAfterChange = Math.sqrt((i - x - penSize) * (i - x - penSize) + (j - y) * (j - y));
          var sinResult = Math.sin(distanceFromOrigin * .1);
          var blueVal = Math.floor(sinResult * 255 / 2 + 255 / 2) + distanceFromOrigin % colorWidth;
          var redVal = Math.floor(Math.sin(distanceAfterChange * .1) * 255 / 2 + 255 / 2) % colorWidth;
          var greenVal = Math.floor(distanceAfterChange) % colorWidth;
          var sWidth = window.innerWidth;

          context.fillStyle = 'rgb(' + Math.floor(redVal) + ', ' + Math.floor(greenVal) + ', ' + Math.floor(blueVal) + ')';

          context.fillRect(i * pixelSize, j * pixelSize, pixelSize, pixelSize);
        }
      }
    }
  }]);

  return MainComponent;
}(React.Component);

ReactDOM.render(React.createElement(MainComponent, null), document.getElementById('mount'));