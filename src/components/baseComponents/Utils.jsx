import React, { useEffect, useState } from 'react'
import './styles.css'

export const Input = ({ value, onChange, placeholder, containerClassName, inputClassName, isError, errorMessage }) => {
  return (
    <div className={containerClassName}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${isError ? 'border-danger' : 'border-grey'} border border-1 w-100 rounded-1 ${inputClassName}`}
      />
      {
        isError
          ? <div style={{ fontSize: '14px' }} className='text-danger mt-1'>{errorMessage}</div>
          : <></>
      }
    </div>
  )
}

export const CustomTabs = ({ tabList, onTabChange, keyName, defaultIndex, reRenderOn, type }) => {
  const [selectedTab, setSelectedTab] = useState(defaultIndex)

  const tabChangeHandler = (tab, index) => () => {
    setSelectedTab(index)
    onTabChange(tab)
  }

  const getClassName = (index) => {
    switch (type) {
      case "box":
        return `${selectedTab === index ? 'box-selected-tab' : ''} box-category-tab`

      case "line":
        return `${selectedTab === index ? 'line-selected-tab' : ''} line-category-tab`

      default:
        break;
    }
  }

  useEffect(() => {
    setSelectedTab(defaultIndex)
    onTabChange(tabList[defaultIndex])
  }, [defaultIndex, ...reRenderOn])


  return (
    <div className='ct-container d-flex'>
      {
        tabList.map((tab, index) => (
          <div
            key={index}
            onClick={tabChangeHandler(tab, index)}
            className={`${getClassName(index)} text-nowrap`}
          >
            {keyName == "" ? tab : tab[keyName]}
          </div>
        ))
      }
    </div>
  )
}