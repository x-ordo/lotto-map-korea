# 🎨 LottoShrine 'Market Eater' Design System (v1.0)

LottoShrine PRO의 디자인은 **Toss의 직관적인 사용자 행동 유도(Action-Oriented)**와 **Vercel Geist의 하이테크 미니멀리즘(High-Tech Minimalism)**을 결합하여 구축되었습니다.

---

## 1. Design Philosophy
- **Authority (권위)**: 볼드한 타이포그래피와 고대비 컬러를 통해 데이터의 전문성을 강조합니다.
- **Ritual (의식)**: 단순한 클릭이 아닌 '인증', '점지', '해독' 등의 용어를 사용하여 사용자에게 특별한 경험을 제공합니다.
- **Speed (속도)**: 불필요한 장식을 배제하고 사용자가 즉시 핵심 지표(당첨 횟수, 기운 점수)를 인지하게 합니다.

---

## 2. Color Palette (ZINC & INDIGO)
| Usage | Color (Tailwind) | Hex | Description |
|:---:|:---:|:---:|:---|
| **Primary** | `zinc-950` | `#09090b` | 브랜드 정체성, 메인 텍스트, 강력한 액션 버튼 |
| **Accent** | `indigo-600` | `#4f46e5` | 강조 포인트, 인터랙션 상태, 브랜드 심볼 |
| **Surface** | `white` | `#ffffff` | 메인 배경, 카드 컴포넌트 |
| **Neutral** | `zinc-100` | `#f4f4f5` | 보조 배경, 구분선, 비활성 상태 |
| **Status** | `emerald-500` | `#10b981` | 실시간 데이터 동기화 상태, 긍정적 지표 |

---

## 3. Typography (GEIST SANS)
- **Primary Font**: `Geist Sans` (San-serif)
- **H1 (Oracle Score)**: `9xl / Black / tracking-tighter` - 압도적인 수치 강조.
- **H2 (Store Name)**: `5xl / Black / tracking-tighter` - 장소의 권위 부여.
- **Body**: `sm / Medium / text-zinc-400` - 메타 정보의 가독성 확보.

---

## 4. Components Logic
### 4.1 Sacred Cards (Toss Style)
- **Structure**: Icon (Left) + Content (Center) + Meta (Right).
- **Interactions**: Hover 시 `zinc-50` 배경 및 `indigo-600` 텍스트 강조.
- **Shadow**: `shadow-sm`을 기본으로 하되, Active 상태에서 `shadow-2xl` 및 `shadow-zinc-200/50` 적용.

### 4.2 Intelligence Dashboard (Vercel Style)
- **Grid**: 12-column 시스템 기반의 반응형 레이아웃.
- **Visuals**: Chart.js의 그리드 라인을 제거하고 데이터 곡선만 강조.
- **Badges**: `rounded-md`의 컴팩트한 뱃지를 사용하여 정보 밀도 조절.

---

## 5. Micro-Interactions
- **Entrance**: 모든 탭 전환 시 `animate-in fade-in slide-in-from-bottom` 애니메이션(500ms) 필수 적용.
- **Button**: 클릭(Active) 시 `scale-95` 축소 효과를 통해 물리적 타격감 제공.
- **Pulse**: 실시간 데이터 요소(`LIVE SYNC`, `기운 감지`)에 `animate-pulse` 효과 부여.

---
**Last Updated**: 2026.01.03
**Maintainer**: LottoShrine Design & Eng Team
