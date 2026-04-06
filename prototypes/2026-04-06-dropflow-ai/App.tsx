const { useState, useEffect, useRef, useCallback } = React;

const COLORS = {
  light: {
    primary: '#2979FF',
    secondary: '#FF5252',
    cta: '#EC4899',
    background: '#FAFAFA',
    card: '#FFFFFF',
    text: '#1A1A1A',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    border: '#E5E7EB',
    success: '#10B981',
    warning: '#F59E0B',
    gradient1: '#2979FF',
    gradient2: '#6C63FF',
    tabBg: 'rgba(255,255,255,0.95)',
    statusBar: '#1A1A1A',
  },
  dark: {
    primary: '#448AFF',
    secondary: '#FF6E6E',
    cta: '#F472B6',
    background: '#0F0F0F',
    card: '#1A1A1A',
    text: '#F9FAFB',
    textSecondary: '#9CA3AF',
    textTertiary: '#6B7280',
    border: '#2D2D2D',
    success: '#34D399',
    warning: '#FBBF24',
    gradient1: '#448AFF',
    gradient2: '#7C73FF',
    tabBg: 'rgba(15,15,15,0.95)',
    statusBar: '#F9FAFB',
  }
};

const FONT = "-apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif";

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState('none');
  const [notifications, setNotifications] = useState(3);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const theme = isDark ? COLORS.dark : COLORS.light;

  const navigateTo = useCallback((screen) => {
    if (screen === activeScreen) return;
    setAnimating(true);
    setSlideDirection('left');
    setTimeout(() => {
      setActiveScreen(screen);
      setSlideDirection('right');
      setTimeout(() => {
        setAnimating(false);
        setSlideDirection('none');
      }, 200);
    }, 150);
  }, [activeScreen]);

  const StatusBar = () => {
    return React.createElement('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 20px 4px',
        fontFamily: FONT,
        fontSize: 13,
        fontWeight: 600,
        color: theme.statusBar,
      }
    },
      React.createElement('span', null, '9:41'),
      React.createElement('div', {
        style: { display: 'flex', gap: 6, alignItems: 'center' }
      },
        React.createElement('div', {
          style: { display: 'flex', gap: 1 }
        },
          [4, 6, 8, 10].map((h, i) =>
            React.createElement('div', {
              key: i,
              style: {
                width: 3,
                height: h,
                backgroundColor: theme.statusBar,
                borderRadius: 1,
              }
            })
          )
        ),
        React.createElement('span', { style: { fontSize: 12 } }, 'WiFi'),
        React.createElement('div', {
          style: {
            width: 24,
            height: 11,
            border: `1.5px solid ${theme.statusBar}`,
            borderRadius: 3,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            padding: 1,
          }
        },
          React.createElement('div', {
            style: {
              width: '70%',
              height: '100%',
              backgroundColor: theme.success,
              borderRadius: 1.5,
            }
          })
        )
      )
    );
  };

  const TabBar = () => {
    const tabs = [
      { id: 'home', label: 'Trang chủ', icon: 'Home' },
      { id: 'orders', label: 'Đơn hàng', icon: 'ShoppingCart' },
      { id: 'products', label: 'Sản phẩm', icon: 'Package' },
      { id: 'discover', label: 'Khám phá', icon: 'TrendingUp' },
      { id: 'settings', label: 'Cài đặt', icon: 'Settings' },
    ];

    return React.createElement('div', {
      style: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.tabBg,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: `0.5px solid ${theme.border}`,
        display: 'flex',
        justifyContent: 'space-around',
        paddingTop: 8,
        paddingBottom: 28,
        zIndex: 100,
      }
    },
      tabs.map(tab => {
        const isActive = activeScreen === tab.id;
        const IconComponent = window.lucide && window.lucide[tab.icon];
        return React.createElement('div', {
          key: tab.id,
          onClick: () => navigateTo(tab.id),
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            transform: isActive ? 'scale(1.1)' : 'scale(1)',
            position: 'relative',
          }
        },
          tab.id === 'orders' && notifications > 0 ? React.createElement('div', {
            style: {
              position: 'absolute',
              top: -4,
              right: 4,
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: theme.secondary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 9,
              fontWeight: 700,
              color: '#FFF',
              zIndex: 10,
            }
          }, notifications) : null,
          IconComponent ? React.createElement(IconComponent, {
            size: 22,
            color: isActive ? theme.primary : theme.textTertiary,
            strokeWidth: isActive ? 2.5 : 2,
          }) : null,
          React.createElement('span', {
            style: {
              fontSize: 10,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? theme.primary : theme.textTertiary,
              fontFamily: FONT,
            }
          }, tab.label)
        );
      })
    );
  };

  const AnimatedNumber = ({ value, prefix = '', suffix = '' }) => {
    const [display, setDisplay] = useState(0);
    useEffect(() => {
      let start = 0;
      const end = typeof value === 'number' ? value : parseFloat(value);
      const duration = 1000;
      const startTime = Date.now();
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(start + (end - start) * eased));
        if (progress >= 1) clearInterval(timer);
      }, 16);
      return () => clearInterval(timer);
    }, [value]);
    return React.createElement('span', null, `${prefix}${display.toLocaleString()}${suffix}`);
  };

  const MetricCard = ({ icon, label, value, change, changePositive, color }) => {
    const [pressed, setPressed] = useState(false);
    const IconComponent = window.lucide && window.lucide[icon];
    return React.createElement('div', {
      onMouseDown: () => setPressed(true),
      onMouseUp: () => setPressed(false),
      onMouseLeave: () => setPressed(false),
      style: {
        backgroundColor: theme.card,
        borderRadius: 16,
        padding: 16,
        flex: 1,
        minWidth: 0,
        border: `1px solid ${theme.border}`,
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        transform: pressed ? 'scale(0.96)' : 'scale(1)',
        boxShadow: pressed ? 'none' : `0 2px 8px rgba(0,0,0,${isDark ? 0.3 : 0.06})`,
        cursor: 'pointer',
      }
    },
      React.createElement('div', {
        style: {
          width: 36,
          height: 36,
          borderRadius: 10,
          backgroundColor: `${color}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
        }
      },
        IconComponent ? React.createElement(IconComponent, { size: 18, color: color }) : null
      ),
      React.createElement('div', {
        style: { fontSize: 13, color: theme.textSecondary, fontFamily: FONT, marginBottom: 4 }
      }, label),
      React.createElement('div', {
        style: { fontSize: 20, fontWeight: 700, color: theme.text, fontFamily: FONT, marginBottom: 4 }
      }, React.createElement(AnimatedNumber, { value: typeof value === 'number' ? value : parseInt(value.replace(/[^\d]/g, '')), prefix: value.toString().includes('đ') ? '' : (value.toString().includes('$') ? '$' : ''), suffix: value.toString().includes('đ') ? 'đ' : '' })),
      change ? React.createElement('div', {
        style: {
          fontSize: 11,
          fontWeight: 600,
          color: changePositive ? theme.success : theme.secondary,
          fontFamily: FONT,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }
      },
        changePositive ? '↑' : '↓',
        ` ${change}`
      ) : null
    );
  };

  const MiniChart = ({ data, color, height = 40 }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const points = data.map((v, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = height - ((v - min) / range) * (height - 4);
      return `${x},${y}`;
    }).join(' ');

    return React.createElement('svg', {
      width: '100%',
      height: height,
      viewBox: `0 0 100 ${height}`,
      preserveAspectRatio: 'none',
      style: { display: 'block' }
    },
      React.createElement('defs', null,
        React.createElement('linearGradient', { id: `grad-${color.replace('#', '')}`, x1: 0, y1: 0, x2: 0, y2: 1 },
          React.createElement('stop', { offset: '0%', stopColor: color, stopOpacity: 0.3 }),
          React.createElement('stop', { offset: '100%', stopColor: color, stopOpacity: 0.02 })
        )
      ),
      React.createElement('polygon', {
        points: `0,${height} ${points} 100,${height}`,
        fill: `url(#grad-${color.replace('#', '')})`,
      }),
      React.createElement('polyline', {
        points: points,
        fill: 'none',
        stroke: color,
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        vectorEffect: 'non-scaling-stroke',
      })
    );
  };

  const HomeScreen = () => {
    const [greeting, setGreeting] = useState('');
    useEffect(() => {
      const h = new Date().getHours();
      if (h < 12) setGreeting('Chào buổi sáng');
      else if (h < 18) setGreeting('Chào buổi chiều');
      else setGreeting('Chào buổi tối');
    }, []);

    const revenueData = [42, 55, 38, 67, 72, 58, 85, 78, 92, 88, 95, 102];
    const orderData = [12, 18, 15, 22, 28, 25, 32, 30, 38, 35, 42, 45];

    const recentOrders = [
      { id: 'DF-2847', customer: 'Nguyễn Văn A', amount: '1.250.000đ', status: 'Đang giao', statusColor: theme.warning },
      { id: 'DF-2846', customer: 'Trần Thị B', amount: '890.000đ', status: 'Đã xác nhận', statusColor: theme.primary },
      { id: 'DF-2845', customer: 'Lê Hoàng C', amount: '2.150.000đ', status: 'Hoàn thành', statusColor: theme.success },
    ];

    const aiInsights = [
      { icon: 'Zap', text: 'Sản phẩm "Tai nghe Bluetooth X3" đang trending +340% tuần này', color: theme.cta },
      { icon: 'AlertTriangle', text: 'Nhà cung cấp TechVN có tỷ lệ trễ hàng tăng 15%', color: theme.warning },
      { icon: 'TrendingUp', text: 'Đề xuất tăng giá "Ốp lưng iPhone" thêm 12% - nhu cầu cao', color: theme.success },
    ];

    return React.createElement('div', {
      style: {
        padding: '0 20px 100px',
        overflowY: 'auto',
        height: '100%',
      }
    },
      React.createElement('div', { style: { paddingTop: 12 } },
        React.createElement('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 20,
          }
        },
          React.createElement('div', null,
            React.createElement('div', {
              style: { fontSize: 15, color: theme.textSecondary, fontFamily: FONT, marginBottom: 2 }
            }, greeting + ' 👋'),
            React.createElement('div', {
              style: { fontSize: 28, fontWeight: 800, color: theme.text, fontFamily: FONT }
            }, 'DropFlow AI')
          ),
          React.createElement('div', {
            onClick: () => setIsDark(!isDark),
            style: {
              width: 42,
              height: 42,
              borderRadius: 14,
              backgroundColor: theme.card,
              border: `1px solid ${theme.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: `0 2px 8px rgba(0,0,0,${isDark ? 0.3 : 0.06})`,
            }
          },
            window.lucide && React.createElement(isDark ? window.lucide.Sun : window.lucide.Moon, {
              size: 20,
              color: theme.text,
            })
          )
        ),

        // AI Summary Card
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, ${theme.gradient1}, ${theme.gradient2})`,
            borderRadius: 20,
            padding: 20,
            marginBottom: 20,
            position: 'relative',
            overflow: 'hidden',
          }
        },
          React.createElement('div', {
            style: {
              position: 'absolute',
              top: -30,
              right: -30,
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: 'rgba(255,255,255,0.1)',
            }
          }),
          React.createElement('div', {
            style: {
              position: 'absolute',
              bottom: -20,
              left: -20,
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: 'rgba(255,255,255,0.08)',
            }
          }),
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }
          },
            window.lucide && React.createElement(window.lucide.Bot, { size: 20, color: '#FFF' }),
            React.createElement('span', {
              style: { fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)', fontFamily: FONT }
            }, 'AI Insights hôm nay')
          ),
          React.createElement('div', {
            style: { fontSize: 22, fontWeight: 800, color: '#FFF', fontFamily: FONT, marginBottom: 4 }
          }, '₫15.840.000'),
          React.createElement('div', {
            style: { fontSize: 13, color: 'rgba(255,255,255,0.8)', fontFamily: FONT, marginBottom: 12 }
          }, 'Doanh thu hôm nay • +23% so với hôm qua'),
          React.createElement('div', { style: { marginBottom: 8 } },
            React.createElement(MiniChart, { data: revenueData, color: '#FFFFFF', height: 50 })
          ),
          React.createElement('div', {
            style: { display: 'flex', gap: 12 }
          },
            React.createElement('div', {
              style: {
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 10,
                padding: '8px 14px',
                flex: 1,
              }
            },
              React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.7)', fontFamily: FONT } }, 'Đơn hàng'),
              React.createElement('div', { style: { fontSize: 18, fontWeight: 700, color: '#FFF', fontFamily: FONT } }, '47')
            ),
            React.createElement('div', {
              style: {
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 10,
                padding: '8px 14px',
                flex: 1,
              }
            },
              React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.7)', fontFamily: FONT } }, 'Lợi nhuận'),
              React.createElement('div', { style: { fontSize: 18, fontWeight: 700, color: '#FFF', fontFamily: FONT } }, '₫4.2M')
            ),
            React.createElement('div', {
              style: {
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 10,
                padding: '8px 14px',
                flex: 1,
              }
            },
              React.createElement('div', { style: { fontSize: 11, color: 'rgba(255,255,255,0.7)', fontFamily: FONT } }, 'Tỷ lệ LN'),
              React.createElement('div', { style: { fontSize: 18, fontWeight: 700, color: '#FFF', fontFamily: FONT } }, '26.5%')
            )
          )
        ),

        // Quick Metrics
        React.createElement('div', {
          style: { display: 'flex', gap: 12, marginBottom: 20 }
        },
          React.createElement(MetricCard, {
            icon: 'ShoppingBag',
            label: 'Đơn mới',
            value: 12,
            change: '+18%',
            changePositive: true,
            color: theme.primary,
          }),
          React.createElement(MetricCard, {
            icon: 'Package',
            label: 'Chờ xử lý',
            value: 8,
            change: '-5%',
            changePositive: true,
            color: theme.warning,
          })
        ),

        // AI Insights
        React.createElement('div', {
          style: { marginBottom: 20 }
        },
          React.createElement('div', {
            style: {
              fontSize: 17,
              fontWeight: 700,
              color: theme.text,
              fontFamily: FONT,
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }
          },
            window.lucide && React.createElement(window.lucide.Sparkles, { size: 18, color: theme.cta }),
            'Gợi ý từ AI'
          ),
          ...aiInsights.map((insight, i) => {
            const InsightIcon = window.lucide && window.lucide[insight.icon];
            return React.createElement('div', {
              key: i,
              style: {
                backgroundColor: theme.card,
                borderRadius: 14,
                padding: 14,
                marginBottom: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                border: `1px solid ${theme.border}`,
                boxShadow: `0 1px 4px rgba(0,0,0,${isDark ? 0.2 : 0.04})`,
              }
            },
              React.createElement('div', {
                style: {
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  backgroundColor: `${insight.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }
              },
                InsightIcon ? React.createElement(InsightIcon, { size: 16, color: insight.color }) : null
              ),
              React.createElement('div', {
                style: { fontSize: 13, color: theme.text, fontFamily: FONT, lineHeight: 1.4 }
              }, insight.text)
            );
          })
        ),

        // Recent Orders
        React.createElement('div', { style: { marginBottom: 20 } },
          React.createElement('div', {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }
          },
            React.createElement('div', {
              style: { fontSize: 17, fontWeight: 700, color: theme.text, fontFamily: FONT }
            }, 'Đơn hàng gần đây'),
            React.createElement('div', {
              onClick: () => navigateTo('orders'),
              style: { fontSize: 13, color: theme.primary, fontWeight: 600, fontFamily: FONT, cursor: 'pointer' }
            }, 'Xem tất cả →')
          ),
          ...recentOrders.map((order, i) =>
            React.createElement('div', {
              key: i,
              onClick: () => { setSelectedOrder(order); navigateTo('orders'); },
              style: {
                backgroundColor: theme.card,
                borderRadius: 14,
                padding: 14,
                marginBottom: 8,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: `1px solid ${theme.border}`,
                cursor: 'pointer',
                boxShadow: `0 1px 4px rgba(0,0,0,${isDark ? 0.2 : 0.04})`,
              }
            },
              React.createElement('div', null,
                React.createElement('div', {
                  style: { fontSize: 15, fontWeight: 600, color: theme.text, fontFamily: FONT, marginBottom: 2 }
                }, order.id),
                React.createElement('div', {
                  style: { fontSize: 13, color: theme.textSecondary, fontFamily: FONT }
                }, order.customer)
              ),
              React.createElement('div', { style: { textAlign: 'right' } },
                React.createElement('div', {
                  style: { fontSize: 15, fontWeight: 700, color: theme.text, fontFamily: FONT, marginBottom: 2 }
                }, order.amount),
                React.createElement('div', {
                  style: {
                    fontSize: 11,
                    fontWeight: 600,
                    color: order.statusColor,
                    backgroundColor: `${order.statusColor}15`,
                    padding: '3px 8px',
                    borderRadius: 6,
                    display: 'inline-block',
                    fontFamily: FONT,
                  }
                }, order.status)
              )
            )
          )
        ),

        // Quick Actions
        React.createElement('div', { style: { marginBottom: 20 } },
          React.createElement('div', {
            style: { fontSize: 17, fontWeight: 700, color: theme.text, fontFamily: FONT, marginBottom: 12 }
          }, 'Thao tác nhanh'),
          React.createElement('div', {
            style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }
          },
            [
              { icon: 'Plus', label: 'Thêm sản phẩm', color: theme.primary, screen: 'products' },
              { icon: 'Truck', label: 'Tạo vận đơn', color: theme.success, screen: 'orders' },
              { icon: 'BarChart3', label: 'Xem báo cáo', color: theme.cta, screen: 'discover' },
              { icon: 'Users', label: 'Nhà cung cấp', color: theme.warning, screen: 'settings' },
            ].map((action, i) => {
              const ActionIcon = window.lucide && window.lucide[action.icon];
              return React.createElement('div', {
                key: i,
                onClick: () => navigateTo(action.screen),
                style: {
                  backgroundColor: theme.card,
                  borderRadius: 14,
                  padding: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  border: `1px solid ${theme.border}`,
                  cursor: 'pointer',
                  boxShadow: `0 1px 4px rgba(0,0,0,${isDark ? 0.2 : 0.04})`,
                }
              },
                React.createElement('div', {
                  style: {
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: `${action.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }
                },
                  ActionIcon ? React.createElement(ActionIcon, { size: 18, color: action.color }) : null
                ),
                React.createElement('span', {
                  style: { fontSize: 13, fontWeight: 600, color: theme.text, fontFamily: FONT }
                }, action.label)
              );
            })
          )
        )
      )
    );
  };

  const OrdersScreen = () => {
    const [filter, setFilter] = useState('all');
    const [searchText, setSearchText] = useState('');

    const orders = [
      { id: 'DF-2847', customer: 'Nguyễn Văn A', items: 3, amount: '1.250.000đ', status: 'shipping', statusLabel: 'Đang giao', date: '10:30 AM', channel: 'Shopee' },
      { id: 'DF-2846', customer: 'Trần Thị B', items: 1, amount: '890.000đ', status: 'confirmed', statusLabel: 'Đã xác nhận', date: '09:15 AM', channel: 'Lazada' },
      { id: 'DF-2845', customer: 'Lê Hoàng C', items: 5, amount: '2.150.000đ', status: 'completed', statusLabel: 'Hoàn thành', date: 'Hôm qua', channel: 'TikTok Shop' },
      { id: 'DF-2844', customer: 'Phạm Đức D', items: 2, amount: '650.000đ', status: 'pending', statusLabel: 'Chờ xử lý', date: 'Hôm qua', channel: 'Shopee' },
      { id: 'DF-2843', customer: 'Võ Thị E', items: 1, amount: '1.890.000đ', status: 'shipping', statusLabel: 'Đang giao', date: '2 ngày trước', channel: 'Web' },
      { id: 'DF-2842', customer: 'Hoàng Minh F', items: 4, amount: '3.200.000đ', status: 'completed', statusLabel: 'Hoàn thành', date: '2 ngày trước', channel: 'Lazada' },
      { id: 'DF-2841', customer: 'Đặng Văn G', items: 2, amount: '420.000đ', status: 'cancelled', statusLabel: 'Đã huỷ', date: '3 ngày trước', channel: 'Shopee' },
    ];

    const statusColors = {
      shipping: theme.warning,
      confirmed: theme.primary,
      completed: theme.success,
      pending: theme.textTertiary,
      cancelled: theme.secondary,
    };

    const filters = [
      { id: 'all', label: 'Tất cả' },
      { id: 'pending', label: 'Chờ xử lý' },
      { id: 'confirmed', label: 'Đã xác nhận' },
      { id: 'shipping', label: 'Đang giao' },
      { id: 'completed', label: 'Hoàn thành' },
    ];

    const filteredOrders = orders.filter(o => {
      if (filter !== 'all' && o.status !== filter) return false;
      if (searchText && !o.id.toLowerCase().includes(searchText.toLowerCase()) && !o.customer.toLowerCase().includes(searchText.toLowerCase())) return false;
      return true;
    });

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
    },
      React.createElement('div', { style: { paddingTop: 12 } },
        React.createElement('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }
        },
          React.createElement('div', {
            style: { fontSize: 28, fontWeight: 800, color: theme.text, fontFamily: FONT }
          }, 'Đơn hàng'),
          React.createElement('div', {
            style: {
              width: 42,
              height: 42,
              borderRadius: 14,
              backgroundColor: theme.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: `0 4px 12px ${theme.primary}40`,
            }
          },
            window.lucide && React.createElement(window.lucide.Plus, { size: 20, color: '#FFF' })
          )
        ),

        // Search
        React.createElement('div', {
          style: {
            backgroundColor: theme.card,
            borderRadius: 14,
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 14,
            border: `1px solid ${theme.border}`,
          }
        },
          window.lucide && React.createElement(window.lucide.Search, { size: 18, color: theme.textTertiary }),
          React.createElement('input', {
            value: searchText,
            onChange: (e) => setSearchText(e.target.value),
            placeholder: 'Tìm đơn hàng, khách hàng...',
            style: {
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: 15,
              fontFamily: FONT,
              color: theme.text,
              width: '100%',
            }
          })
        ),

        // Filters
        React.createElement('div', {
          style: {
            display: 'flex',
            gap: 8,
            marginBottom: 16,
            overflowX: 'auto',
            paddingBottom: 4,
          }
        },
          ...filters.map(f =>
            React.createElement('div', {
              key: f.id,
              onClick: () => setFilter(f.id),
              style: {
                padding: '7px 14px',
                borderRadius: 20,
                backgroundColor: filter === f.id ? theme.primary : theme.card,
                color: filter === f.id ? '#FFF' : theme.textSecondary,
                fontSize: 13,
                fontWeight: 600,
                fontFamily: FONT,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                border: filter === f.id ? 'none' : `1px solid ${theme.border}`,
                transition: 'all 0.2s ease',
              }
            }, f.label)
          )
        ),

        // Stats bar
        React.createElement('div', {
          style: {
            display: 'flex',
            gap: 8,
            marginBottom: 16,
          }
        },
          [
            { label: 'Hôm nay', value: '12', color: theme.primary },
            { label: 'Chờ xử lý', value: '8', color: theme.warning },
            { label: 'Đang giao', value: '15', color: theme.success },
          ].map((stat, i) =>
            React.createElement('div', {
              key: i,
              style: {
                flex: 1,
                backgroundColor: `${stat.color}10`,
                borderRadius: 12,
                padding: '10px 12px',
                textAlign: 'center',
              }
            },
              React.createElement('div', {
                style: { fontSize: 18, fontWeight: 800, color: stat.color, fontFamily: FONT }
              }, stat.value),
              React.createElement('div', {
                style: { fontSize: 11, color: theme.textSecondary, fontFamily: FONT }
              }, stat.label)
            )
          )
        ),

        // Order list
        ...filteredOrders.map((order, i) =>
          React.createElement('div', {
            key: i,
            style: {
              backgroundColor: theme.card,
              borderRadius: 16,
              padding: 16,
              marginBottom: 10,
              border: `1px solid ${theme.border}`,
              boxShadow: `0 1px 4px rgba(0,0,0,${isDark ? 0.2 : 0.04})`,
              cursor: 'pointer',
            }
          },
            React.createElement('div', {
              style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }
            },
              React.createElement('div', null,
                React.createElement('div', {
                  style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }
                },
                  React.createElement('span', {
                    style: { fontSize: 15, fontWeight: 700, color: theme.text, fontFamily: FONT }
                  }, order.id),
                  React.createElement('span', {
                    style: {
                      fontSize: 10,
                      fontWeight: 600,
                      color: theme.primary,
                      backgroundColor: `${theme.primary}15`,
                      padding: '2px 6px',
                      borderRadius: 4,
                      fontFamily: FONT,
                    }
                  }, order.channel)
                ),
                React.createElement('div', {
                  style: { fontSize: 13, color: theme.textSecondary, fontFamily: FONT }
                }, `${order.customer} • ${order.items} sản phẩm`)
              ),
              React.createElement('div', {
                style: {
                  fontSize: 11,
                  fontWeight: 600,
                  color: statusColors[order.status],
                  backgroundColor: `${statusColors[order.status]}15`,
                  padding: '4px 10px',
                  borderRadius: 8,
                  fontFamily: FONT,
                }
              }, order.statusLabel)
            ),
            React.createElement('div', {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 10,
                borderTop: `1px solid ${theme.border}`,
              }
            },
              React.createElement('div', {
                style: { fontSize: 13, color: theme.textTertiary, fontFamily: FONT }
              }, order.date),
              React.createElement('div', {
                style: { fontSize: 17, fontWeight: 700, color: theme.text, fontFamily: FONT }
              }, order.amount)
            )
          )
        ),

        filteredOrders.length === 0 && React.createElement('div', {
          style: {
            textAlign: 'center',
            padding: 40,
            color: theme.textTertiary,
            fontFamily: FONT,
          }
        },
          window.lucide && React.createElement(window.lucide.Inbox, { size: 48, color: theme.textTertiary, style: { marginBottom: 12 } }),
          React.createElement('div', { style: { fontSize: 15 } }, 'Không có đơn hàng nào')
        )
      )
    );
  };

  const ProductsScreen = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
      { id: 'all', label: 'Tất cả', count: 124 },
      { id: 'electronics', label: 'Điện tử', count: 45 },
      { id: 'fashion', label: 'Thời trang', count: 38 },
      { id: 'home', label: 'Gia dụng', count: 22 },
      { id: 'beauty', label: 'Làm đẹp', count: 19 },
    ];

    const products = [
      { name: 'Tai nghe Bluetooth X3 Pro', price: '450.000đ', cost: '180.000đ', margin: '60%', sales: 234, stock: 45, trend: 'up', rating: 4.8, img: '🎧' },
      { name: 'Ốp lưng iPhone 15 Clear', price: '120.000đ', cost: '35.000đ', margin: '71%', sales: 567, stock: 128, trend: 'up', rating: 4.5, img: '📱' },
      { name: 'Đèn LED Thông Minh RGB', price: '350.000đ', cost: '140.000đ', margin: '60%', sales: 189, stock: 32, trend: 'up', rating: 4.6, img: '💡' },
      { name: 'Bình giữ nhiệt 500ml', price: '280.000đ', cost: '95.000đ', margin: '66%', sales: 412, stock: 67, trend: 'down', rating: 4.3, img: '🥤' },
      { name: 'Bàn phím cơ RGB Mini', price: '890.000đ', cost: '380.000đ', margin: '57%', sales: 98, stock: 15, trend: 'up', rating: 4.7, img: '⌨️' },
      { name: 'Máy hút bụi cầm tay', price: '1.200.000đ', cost: '520.000đ', margin: '57%', sales: 76, stock: 8, trend: 'down', rating: 4.4, img: '🧹' },
    ];

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
    },
      React.createElement('div', { style: { paddingTop: 12 } },
        React.createElement('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }
        },
          React.createElement('div', {
            style: { fontSize: 28, fontWeight: 800, color: theme.text, fontFamily: FONT }
          }, 'Sản phẩm'),
          React.createElement('div', { style: { display: 'flex', gap: 8 } },
            React.createElement('div', {
              onClick: () => setViewMode(viewMode === 'grid' ? 'list' : 'grid'),
              style: {
                width: 42,
                height: 42,
                borderRadius: 14,
                backgroundColor: theme.card,
                border: `1px solid ${theme.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }
            },
              window.lucide && React.createElement(viewMode === 'grid' ? window.lucide.List : window.lucide.Grid3X3, {
                size: 18, color: theme.text
              })
            ),
            React.createElement('div', {
              style: {
                width: 42,
                height: 42,
                borderRadius: 14,
                backgroundColor: theme.cta,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: `0 4px 12px ${theme.cta}40`,
              }
            },
              window.lucide && React.createElement(window.lucide.Plus, { size: 20, color: '#FFF' })
            )
          )
        ),

        // AI Auto pricing banner
        React.createElement('div', {
          style: {
            background: `linear-gradient(135deg, ${theme.cta}, #F472B6)`,
            borderRadius: 16,
            padding: 16,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }
        },
          React.createElement('div', {
            style: {
              width: 44,
              height: 44,
              borderRadius: 12,
              backgroundColor: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }
          },
            window.lucide && React.createElement(window.lucide.Zap, { size: 22, color: '#FFF' })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('div', {
              style: { fontSize: 14, fontWeight: 700, color: '#FFF', fontFamily: FONT, marginBottom: 2 }
            }, 'Định giá AI đang hoạt động'),
            React.createElement('div', {
              style: { fontSize: 12, color: 'rgba(255,255,255,0.85)', fontFamily: FONT }
            }, '12 sản phẩm được điều chỉnh giá hôm nay')
          ),
          window.lucide && React.createElement(window.lucide.ChevronRight, { size: 18, color: '#FFF' })
        ),

        // Categories
        React.createElement('div', {
          style: {
            display: 'flex',
            gap: 8,
            marginBottom: 16,
            overflowX: 'auto',
            paddingBottom: 4,
          }
        },
          ...categories.map(cat =>
            React.createElement('div', {
              key: cat.id,
              onClick: () => setActiveCategory(cat.id),
              style: {
                padding: '7px 14px',
                borderRadius: 20,
                backgroundColor: activeCategory === cat.id ? theme.primary : theme.card,
                color: activeCategory === cat.id ? '#FFF' : theme.textSecondary,
                fontSize: 13,
                fontWeight: 600,
                fontFamily: FONT,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                border: activeCategory === cat.id ? 'none' : `1px solid ${theme.border}`,
                transition: 'all 0.2s ease',
              }
            }, `${cat.label} (${cat.count})`)
          )
        ),

        // Products grid
        viewMode === 'grid' ?
          React.createElement('div', {
            style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }
          },
            ...products.map((product, i) =>
              React.createElement('div', {
                key: i,
                style: {
                  backgroundColor: theme.card,
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: `1px solid ${theme.border}`,
                  boxShadow: `0 2px 8px rgba(0,0,0,${isDark ? 0.2 : 0.04})`,
                  cursor: 'pointer',
                }
              },
                React.createElement('div', {
                  style: {
                    height: 100,
                    backgroundColor: `${theme.primary}08`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 42,
                    position: 'relative',
                  }
                },
                  product.img,
                  product.stock < 20 && React.createElement('div', {
                    style: {
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      fontSize: 9,
                      fontWeight: 700,
                      color: theme.secondary,
                      backgroundColor: `${theme.secondary}15`,
                      padding: '2px 6px',
                      borderRadius: 4,
                      fontFamily: FONT,
                    }
                  }, 'Sắp hết'),
                  React.createElement('div', {
                    style: {
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }
                  },
                    window.lucide && React.createElement(product.trend === 'up' ? window.lucide.TrendingUp : window.lucide.TrendingDown, {
                      size: 12,
                      color: product.trend === 'up' ? theme.success : theme.secondary,
                    })
                  )
                ),
                React.createElement('div', { style: { padding: 12 } },
                  React.createElement('div', {
                    style: {
                      fontSize: 13,
                      fontWeight: 600,
                      color: theme.text,
                      fontFamily: FONT,
                      marginBottom: 6,
                      lineHeight: 1.3,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }
                  }, product.name),
                  React.createElement('div', {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 4,
                    }
                  },
                    React.createElement('span', {
                      style: { fontSize: 15, fontWeight: 700, color: theme.primary, fontFamily: FONT }
                    }, product.price),
                    React.createElement('span', {
                      style: {
                        fontSize: 10,
                        fontWeight: 700,
                        color: theme.success,
                        backgroundColor: `${theme.success}15`,
                        padding: '2px 6px',
                        borderRadius: 4,
                        fontFamily: FONT,
                      }
                    }, product.margin)
                  ),
                  React.createElement('div', {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 11,
                      color: theme.textTertiary,
                      fontFamily: FONT,
                    }
                  },
                    React.createElement('span', null, `${product.sales} đã bán`),
                    React.createElement('span', null, `⭐ ${product.rating}`)
                  )
                )
              )
            )
          ) :
          React.createElement('div', null,
            ...products.map((product, i) =>
              React.createElement('div', {
                key: i,
                style: {
                  backgroundColor: theme.card,
                  borderRadius: 14,
                  padding: 14,
                  marginBottom: 8,
                  display: 'flex',
                  gap: 12,
                  alignItems: 'center',
                  border: `1px solid ${theme.border}`,
                  cursor: 'pointer',
                }
              },
                React.createElement('div', {
                  style: {
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    backgroundColor: `${theme.primary}08`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 28,
                    flexShrink: 0,
                  }
                }, product.img),
                React.createElement('div', { style: { flex: 1, minWidth: 0 } },
                  React.createElement('div', {
                    style: { fontSize: 14, fontWeight: 600, color: theme.text, fontFamily: FONT, marginBottom: 2 }
                  }, product.name),
                  React.createElement('div', {
                    style: { fontSize: 12, color: theme.textSecondary, fontFamily: FONT }
                  }, `${product.sales} đã bán • Kho: ${product.stock}`)
                ),
                React.createElement('div', { style: { textAlign: 'right' } },
                  React.createElement('div', {
                    style: { fontSize: 14, fontWeight: 700, color: theme.primary, fontFamily: FONT }
                  }, product.price),
                  React.createElement('div', {
                    style: { fontSize: 11, color: theme.success, fontWeight: 600, fontFamily: FONT }
                  }, product.margin)
                )
              )
            )
          )
      )
    );
  };

  const DiscoverScreen = () => {
    const [activeTab, setActiveTab] = useState('trending');

    const trendingProducts = [
      { name: 'Quạt cầm tay Mini USB', trend: '+540%', category: 'Điện tử', score: 95, emoji: '🌀', sales: '12.4K/tuần' },
      { name: 'Serum Vitamin C 20%', trend: '+380%', category: 'Làm đẹp', score: 92, emoji: '✨', sales: '8.7K/tuần' },
      { name: 'Túi đeo chéo Canvas', trend: '+290%', category: 'Thời trang', score: 88, emoji: '👜', sales: '6.2K/tuần' },
      { name: 'Đèn bàn LED sạc USB', trend: '+250%', category: 'Gia dụng', score: 85, emoji: '💡', sales: '5.1K/tuần' },
      { name: 'Kẹp tóc kim loại set 6', trend: '+220%', category: 'Phụ kiện', score: 82, emoji: '💎', sales: '4.8K/tuần' },
    ];

    const niches = [
      { name: 'Phụ kiện WFH', growth: '+45%', products: 234, competition: 'Thấp', color: theme.success },
      { name: 'Skincare Hàn Quốc', growth: '+38%', products: 567, competition: 'Trung bình', color: theme.warning },
      { name: 'Đồ chơi STEM', growth: '+62%', products: 123, competition: 'Thấp', color: theme.primary },
      { name: 'Thời trang bền vững', growth: '+55%', products: 189, competition: 'Thấp', color: theme.cta },
    ];

    const performanceData = [65, 72, 58, 85, 92, 78, 95, 88, 102, 96, 110, 108];
    const conversionData = [3.2, 3.5, 3.1, 3.8, 4.2, 3.9, 4.5, 4.3, 4.8, 4.6, 5.1, 4.9];

    return React.createElement('div', {
      style: { padding: '0 20px 100px', overflowY: 'auto', height: '100%' }
    },
      React.createElement('div', { style: { paddingTop: 12 } },
        React.createElement('div', {
          style: { fontSize: 28, fontWeight: 800, color: theme.text, fontFamily: FONT, marginBottom: 16 }
        }, 'Khám phá'),

        // Tabs
        React.createElement('div', {
          style: {
            display: 'flex',
            backgroundColor: theme.card,
            borderRadius: 14,
            padding: 4,
            marginBottom: 20,
            border: `1px solid ${theme.border}`,
          }
        },
          ['trending', 'niches', 'analytics'].map(tab => {
            const labels = { trending: '🔥 Xu hướng', niches: '🎯 Ngách tiềm năng', analytics: '📊 Phân tích' };
            return React.createElement('div', {
              key: tab,
              onClick: () => setActiveTab(tab),
              style: {
                flex: 1,
                padding: '9px 4px',
                borderRadius: 10,
                backgroundColor: activeTab === tab ? theme.primary : 'transparent',
                color: activeTab === tab ? '#FFF' : theme.textSecondary,
                fontSize: 12,
                fontWeight: 600,
                fontFamily: FONT,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }
            }, labels[tab]);
          })
        ),

        activeTab === 'trending' && React.createElement('div', null,
          React.createElement('div', {
            style: {
              background: `linear-gradient(135deg, #FF6B35, #FF8F65)`,
              borderRadius: 16,
              padding: 16,
              marginBottom: 16,
            }
          },
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }
            },
              window.lucide && React.createElement(window.lucide.Flame, { size: 18, color: '#FFF' }),
              React.createElement('span', {
                style: { fontSize: 14, fontWeight: 700, color: '#FFF', fontFamily: FONT }
              }, 'AI đã phát hiện 5 sản phẩm hot mới')
            ),
            React.createElement('div', {
              style: { fontSize: 12, color: 'rgba(255,255,255,0.85)', fontFamily: FONT }
            }, 'Dựa trên phân tích 50+ kênh bán hàng và social media')
          ),
          ...trendingProducts.map((product, i) =>
            React.createElement('div', {
              key: i,
              style: {
                backgroundColor: theme.card,
                borderRadius: 16,
                padding: 16,
                marginBottom: 10,
                border: `1px solid ${theme.border}`,
                boxShadow: `0 2px 8px rgba(0,0,0,${isDark ? 0.2 : 0.04})`,
              }
            },
              React.createElement('div', {
                style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }
              },
                React.createElement('div', {
                  style: {
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    backgroundColor: `${theme.primary}08`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 26,
                  }
                }, product.emoji),
                React.createElement('div', { style: { flex: 1 } },
                  React.createElement('div', {
                    style: { fontSize: 15, fontWeight: 700, color: theme.text, fontFamily: FONT, marginBottom: 2 }
                  }, product.name),
                  React.createElement('div', {
                    style: { fontSize: 12, color: theme.textSecondary, fontFamily: FONT }
                  }, `${product.category} • ${product.sales}`)
                ),
                React.createElement('div', { style: { textAlign: 'right' } },
                  React.createElement('div', {
                    style: { fontSize: 15, fontWeight: 800, color: theme.success, fontFamily: FONT }
                  }, product.trend),
                  React.createElement('div', {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      justifyContent: 'flex-end',
                    }
                  },
                    React.createElement('div', {
                      style: {
                        width: 28,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: `${theme.primary}20`,
                        overflow: 'hidden',
                      }
                    },
                      React.createElement('div', {
                        style: {
                          width: `${product.score}%`,
                          height: '100%',
                          backgroundColor: theme.primary,
                          borderRadius: 2,
                        }
                      })
                    ),
                    React.createElement('span', {
                      style: { fontSize: 10, color: theme.textTertiary, fontFamily: FONT }
                    }, product.score)
                  )
                )
              ),
              React.createElement('div', {
                style: {
                  display: 'flex',
                  gap: 8,
                }
              },
                React.createElement('div', {
                  style: {
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 10,
                    backgroundColor: theme.primary,
                    color: '#FFF',
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: FONT,
                    textAlign: 'center',
                    cursor: 'pointer',
                  }
                }, 'Thêm vào danh mục'),
                React.createElement('div', {
                  style: {
                    padding: '8px 12px',
                    borderRadius: 10,