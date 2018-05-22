import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { convertDyadicArray, getDateList, dateFormat } from './utils'
import leftArrow from './assets/arrow-l.png'
import rightArrow from './assets/arrow-r.png'
import './assets/calendar.scss'

export default class Calendar extends React.Component {
  static propTypes = {
    onSelect: PropTypes.func,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    locale: PropTypes.string,
  }

  static defaultProps = {
    onSelect() {},
    minDate: '0', // '0' < '2013-08-01'
    maxDate: '9', // '09' > '2021-02-01'
    locale: 'en'
  }

  constructor(props) {
    super(props)
    const now = new Date()
    const today = dateFormat(now)
    const year = +today.slice(0, 4)
    const month = +today.slice(5, 7)
    const dateList = getDateList(year, month)
    const list = convertDyadicArray(dateList, 6)

    var activeDate = today
    if (this.props.activeDate) {
      activeDate = this.props.activeDate
    }

    this.state = {
      year,
      month,
      activeDate,
      today,
      list,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(this.state.year === nextState.year &&
      this.state.month === nextState.month &&
      this.state.activeDate === nextState.activeDate
    )
  }

  // Next Month
  handleIncreaseMonth = () => {
    // 当月 new Date(this.state.year, this.state.month -1)
    const nextMonth = new Date(this.state.year, this.state.month)
    const year = nextMonth.getFullYear()
    const month = nextMonth.getMonth() + 1
    const dateList = getDateList(year, month)
    const list = convertDyadicArray(dateList, 6)

    this.setState({ year, month, list })

    console.log("下个月：" + month)
  }

  // Previous Month
  handleReduceMonth = () => { 
    const lastMonth = new Date(this.state.year, this.state.month - 2)
    const year = lastMonth.getFullYear()
    const month = lastMonth.getMonth() + 1
    const dateList = getDateList(year, month)
    const list = convertDyadicArray(dateList, 6)

    this.setState({ year, month, list })

    console.log("上个月：" + month)
  }

  // 点击相应的天数
  handleSelectDate = (e) => {

    const el = e.target
    if (el.nodeName === 'SPAN' && el.className.indexOf('item-disable') === -1) {
      const activeDate = el.getAttribute('data-date')
      this.props.onSelect(activeDate)
      const month = +activeDate.slice(5, 7)
      const year = +activeDate.slice(0, 4)

      this.props.selectday(activeDate)

      if (this.state.activeDate !== activeDate) {
        if (this.state.month !== month) {
          const dateList = getDateList(year, month)
          const list = convertDyadicArray(dateList, 6)
          this.setState({ year, month, activeDate, list })
        } else {
          this.setState({ activeDate })
        }
      }
    }
  }

  // 其他页面需要传递给Calendar的日期(根据自己需要进行添加,不需要的，可以忽略)
  // trigerActiveDate = (activeDate) => {
  //   this.props.onSelect(activeDate)
  //   const month = +activeDate.slice(5, 7)
  //   const year = +activeDate.slice(0, 4)

  //   this.props.selectday(activeDate)

  //   if (this.state.activeDate !== activeDate) {
  //     if (this.state.month !== month) {
  //       const dateList = getDateList(year, month)
  //       const list = convertDyadicArray(dateList, 6)
  //       this.setState({ year, month, activeDate, list })
  //     } else {
  //       this.setState({ activeDate })
  //     }
  //   }
  // }

  getClassName(dateItem) {
    const { year, month, today, activeDate } = this.state
    var className
    const strYM = month < 10 ? `${year}-0${month}` : `${year}-${month}`

    // console.log(strYM)
    const { minDate, maxDate } = this.props
    if (dateItem.indexOf(strYM, 0) === -1) {
      className = dateItem === today ? 'item-light item-today' : 'item-light'
    } else {
      if (dateItem === activeDate) {
        className = dateItem === today ? 'item-active item-today' : 'item-active'
      } else {
        className = dateItem === today ? 'item-today' : ''
      }
    }

    if ((minDate > dateItem) || (maxDate < dateItem)) {
      className = dateItem === today ? 'item-disable item-today' : 'item-disable'
    }

    // let class_name = this.props.currentday(dateItem)
    // if (class_name != '') {
    //   className = (className + " " + class_name)
    // }


    // 判断当前是否是 “今天” ，并去除掉border的样式（根据自己需要进行添加）
    if(className.indexOf("item-today") !== -1) {
      className += " noborder"
    }

    return className
  }

  renderHeader() {
    const { year, month } = this.state
    const { locale } = this.props
    const monthEn = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    // const monthEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return (
      <div className="calendar-header">
        <img
          className="icon-left"
          src={leftArrow}
          onClick={this.handleReduceMonth}
        />
        {
          locale === 'zh' ? `${monthEn[month - 1]} ${year}`
            : `${year}-${month}`
        }
        <img
          className="icon-right"
          src={rightArrow}
          onClick={this.handleIncreaseMonth}
        />
      </div>
    )
  }

  renderTable() {
    const weekdays = this.props.locale === 'en' ? ['日', '一', '二', '三', '四', '五', '六']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    
    // const weekdays = this.props.locale === 'en' ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    //   : ['日', '一', '二', '三', '四', '五', '六']
    return (
      <table className="calendar-table">
        <tbody onClick={this.handleSelectDate}>
          <tr>
            {
              weekdays.map((w, i) => <th key={w} >{w}</th>)
            }
          </tr>
          {this.state.list.map(arr => {
            return (
              <tr key={arr[0]}>
                {arr.map(value =>
                  (<td key={value}>
                    <span
                      data-date={value}
                      className={this.getClassName(value)}
                    >
                      { 
                        this.getClassName(value).indexOf("item-today") !== -1 ? "今" : value.slice(8)
                      }
                    </span>
                  </td>)
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  render() {
    return (
      <div style={{ width: '100%', height: '355px', fontSize: '14px' }}>
        {this.renderHeader()}
        {this.renderTable()}
      </div>
    )
  }
}