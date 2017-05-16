import React, {Component, PropTypes} from 'react'
import {TITLE_COLOR} from '../const/WeatherConst'
import {View} from 'react-native'
import Svg, {Circle, Line, Text} from 'react-native-svg';


export  default class BrokenItem extends Component {

    /**
     * 温度信息
     **/
    mTemperature
    maxTemperature
    minTemperature

    mWidth
    mHeight

    strokeWidth

    /**
     * 上下留出的距离
     **/
    topBottomPadding;

    /**
     * 左右留出的距离
     **/
    leftRightPadding;

    /**
     * 每一项的宽高
     * **/
    mItemHeight
    mItemWidth
    /**
     * 文字在上还是下，默认在下
     **/
    textDown

    //分别表示折线，小圆点，大圆点和文字
    lineArray
    litterCircleArray
    largeCircleArray
    textArray


    static propTypes = {
        dataSource: PropTypes.array,

        leftRightPadding: PropTypes.number,
        topBottomPadding: PropTypes.number,
        mWidth: PropTypes.number,
        mHeight: PropTypes.number,
        textDown: PropTypes.bool,
        strokeWidth: PropTypes.number
    }

    constructor(props) {
        super(props);
        this.mTemperature = this.props.dataSource;
        this.mWidth = this.props.mWidth;
        this.mHeight = this.props.mHeight;
        this.strokeWidth = this.props.strokeWidth;
        this.leftRightPadding = this.props.leftRightPadding;
        this.topBottomPadding = this.props.topBottomPadding;
        this.textDown = this.props.textDown;

        this._chooseMaxMinTemperature();
        this._getWidthHeight();
        this._getDrawPath();
    }

    render() {
        return (
            <View style={{marginTop: this.textDown ? 0 : 20, marginBottom: this.textDown ? 20 : 0}}>
                <Svg height={this.mHeight}
                     width={this.mWidth}>
                    {this.largeCircleArray}
                    {this.litterCircleArray}
                    {this.textArray}
                    {this.lineArray}
                </Svg>
            </View>
        )
    }


    _getDrawPath() {
        //这里是一个字符串
        this.lineArray = new Array();
        this.litterCircleArray = new Array();
        this.largeCircleArray = new Array();
        this.textArray = new Array();

        let x;
        let y;
        let largeRadius = this.strokeWidth * 2;
        let litterRadius = this.strokeWidth * 0.8;
        //首先计算宽高
        for (let i = 0; i < this.mTemperature.length; i++) {
            let nextX = this.leftRightPadding + this.mItemWidth * i;
            let nextY = this.topBottomPadding + this.mItemHeight * (Math.abs(this.mTemperature[i] - this.maxTemperature));
            //画折线
            if (i > 0) {
                this.lineArray.push(
                    <Line
                        key={i}
                        x1={x}
                        y1={y}
                        x2={nextX}
                        y2={nextY}
                        stroke={TITLE_COLOR}
                        strokeWidth={this.strokeWidth}
                    />)
            }
            x = nextX;
            y = nextY;
            //外部透明圆点
            this.largeCircleArray.push(
                <Circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={largeRadius}
                    fill='#c2e8d4'/>)
            //中间实心圆点
            this.litterCircleArray.push(
                <Circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={litterRadius}
                    fill={TITLE_COLOR}/>)
            //文本
            this.textArray.push(
                <Text
                    key={i}
                    fontSize="10"
                    fill={TITLE_COLOR}
                    x={x}
                    y={this.textDown ? y + largeRadius : y - this.topBottomPadding}
                    textAnchor="middle">{this.mTemperature[i] + "°"}</Text>);

        }
    }

    /**
     * 计算高度
     **/
    _getWidthHeight() {
        this.mItemHeight = ((this.mHeight - this.topBottomPadding * 2)) / (this.maxTemperature - this.minTemperature == 0 ? 1 : this.maxTemperature - this.minTemperature);
        this.mItemWidth = (this.mWidth - this.leftRightPadding * 2) / (this.mTemperature.length - 1);
    }

    /**
     * 选择出最大和最小的温度
     **/
    _chooseMaxMinTemperature() {
        //赋予第一个值为最大或者最小
        this.maxTemperature = this.mTemperature[0];
        this.minTemperature = this.mTemperature[0];
        for (let i = 0; i < this.mTemperature.length; i++) {
            this.maxTemperature = Math.max(this.maxTemperature, this.mTemperature[i]);
            this.minTemperature = Math.min(this.minTemperature, this.mTemperature[i]);
        }
    }
}