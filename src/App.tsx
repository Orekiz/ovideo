import { Outlet } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [antdTheme, setAntdTheme] = useState<'light'|'dark'>('light')
  const [antdThemeColor, setAntdThemeColor] = useState<string>('#6d28d9')

  useEffect(() => {
    // 拿到用户的亮色暗色主题选择
    const prefersColorSchemeDark = window.matchMedia('(prefers-color-scheme: dark)')
    // 更改antd主题
    if (prefersColorSchemeDark.matches) {
      setAntdTheme('dark')
      setAntdThemeColor('#a78bfa')
    }
    prefersColorSchemeDark.addEventListener('change', (e) => {
      if (e.matches) {
        setAntdTheme('dark')
        setAntdThemeColor('#a78bfa')
      }
      else {
        setAntdTheme('light')
        setAntdThemeColor('#6d28d9')
      }
    })
  }, [])
  return (
    <ConfigProvider
      theme={{
        algorithm: antdTheme==='light'?theme.defaultAlgorithm:theme.darkAlgorithm,
        token: {
          borderRadius: 8,
          colorPrimary: antdThemeColor,
        }
      }}
    >
      <Outlet />
    </ConfigProvider>
  )
}

export default App
