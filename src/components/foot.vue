<template>
  <div class="footCss">
    <div :class="touch == 1 ? 'footDemos' : 'footDemo'" @click="goRouter('/home', 1)">
      <!-- <div class="homeImgOut" v-show="$store.state.select == '/home'">
        <div class="homeImg">
          <img src="~@/assets/foot/ic_home_tab_def.png" />
        </div>
      </div>
      <div v-show="$store.state.select != '/home'" class="footImgDeft">
        <img src="~@/assets/foot/tab_main_home_default.png" />
      </div>
      <div v-show="$store.state.select != '/home'">{{ $t('hj224') }}</div> -->
      <div class="footImgDeft">
        <img v-show="$store.state.select == '/home'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF42lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIzLTA2LTA5VDE0OjEyOjQ5KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMy0wNi0wOVQxNToyNzozNSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMy0wNi0wOVQxNToyNzozNSswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5Mzk1OGRjNi01ZmY4LTBiNGEtYmJkNi02OGNjYzdiZTI5ZGQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6YjZlOWZjNDMtYTA4ZC00ZDQzLTlkNzQtYzYxMGVjNWVlZTYzIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YjZlOWZjNDMtYTA4ZC00ZDQzLTlkNzQtYzYxMGVjNWVlZTYzIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpiNmU5ZmM0My1hMDhkLTRkNDMtOWQ3NC1jNjEwZWM1ZWVlNjMiIHN0RXZ0OndoZW49IjIwMjMtMDYtMDlUMTQ6MTI6NDkrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OTM5NThkYzYtNWZmOC0wYjRhLWJiZDYtNjhjY2M3YmUyOWRkIiBzdEV2dDp3aGVuPSIyMDIzLTA2LTA5VDE1OjI3OjM1KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ohfOUwAAARVJREFUOI211U0rRFEYAOBnNBTlYwY/wMrCRzOI2E4p+RMW/BG/w0pJWSv53GOBBSlbZWkjFmIs7h0d03XvHTPe3Xve9zydj869hXq9rpNReKnN5+mrohsXWY1dObA5nOEES+2CszjCEPpxgMWgPt5spIEzMVYKxgZidAEbuMdmOKn4C1bFMcoJtUEc4jzOx7JWWEnBQnQ5qdAMTsfYcAqWGiE4JbrJkRaNFdF5/wAncYrRPyyqJNpVtQFOtIE1ohyjlSJ20ItX9CU0P2MLn1iXfL5v6MFuUXSrsIr9psYP1HAV59u4Fj3DMNawR/ZLeQgwuMNt2oQs8D3nWG6w5fhXsJ0v7ffcELzB4x+wJ1w2kkKnfwFfUdMxgqWTVpsAAAAASUVORK5CYII=" />
        <img v-show="$store.state.select != '/home'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAmhJREFUOE/V1D1oFEEUB/D/251NQAQ/wCgxiIgfRL3Z3VnTWJ0QNKhgpRa2dkJqC7FSsBWsgnUQFWy0SmKs/AjOfsyBjeJHEIWAooiEZD+ejNyF8/DuFGzcanf27W9n3nszhH980Z94vu+HALwsyxb6xfcFwzA8REQzROSWZTmRpunjXmhPUCkVAbDYZ2bOiWi4qqqJJEmeWFRKuc8Y8xJA1fpJV1BKqTzPmwHwZWVlpT44OFgAmAewLc/zY0IISURTzHw1juNLPUGbMyHELICvAOpa60X7QRiGw47jWHQrMz8joqMAprXW57qCQRAEruvOMvM3Zq4nSfKuPWe+7293XXeeiPY0x7uDSim7jDlm/l5VVT1N07e/K4CUckQIYdHdXWcYRVGNmeeIaDnP87ox5k2valrU87xHzLy5KIpxY0xs438WRUp5UAjx0GKrq6tHGo3G6w7MbT6X7eNRFO1oFmqjRbMsS8j3/QOu61psiJnvFUUxaYx5bz8MgmCn4zjXAUwQETGzLdRkHMevmhMZ8jzvBoDTAD6VZTlOSqmUiHYBsLNYV1XVWJIkz2u12qaBgYGMmdcDuElEttfOA8jzPPeNMUtKqVEiegFgGYBtqw9rfRhF0QkA91tgFEUXAVwpimLMLqXZNvsdx0mrqrqWJMnlFsjMZ+M4vr2WQ3vTCSqlbhGRr7Ue7chbwsyLcRyf+lvwLhHt1VrLdlAptUBES1rrk/85GATBcdd1HzDzlK0WgDNEVHZZ8gZmngawhYgu2Fit9Z1fimL3qBDiKYCRtpw1uoBjbTEfy7I83NqmfQ/Yfid05/sf/QhnVUE/hqUAAAAASUVORK5CYII=" />
      </div>
      <div :class="$store.state.select == '/home' ? 'blueFont' : ''">{{ $t('hj224') }}</div>
    </div>
    <div :class="touch == 2 ? 'footDemos' : 'footDemo'" @click="goRouter('/trading-list', 2)">
      <div class="footImgDeft">
        <img v-show="$store.state.select == '/trading-list'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF42lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIzLTA2LTA5VDE0OjEzOjA5KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMy0wNi0wOVQxNToyNzozOSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMy0wNi0wOVQxNToyNzozOSswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkZDc3MDM3Ni1jMjc2LWZmNGEtYTg0OC1kYzcwOWE3NDg0MDUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzE4ZWQ0NzUtZmI1OC0xYzRmLWI0ZWItZTMxNDU0MGU1NDE2IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NzE4ZWQ0NzUtZmI1OC0xYzRmLWI0ZWItZTMxNDU0MGU1NDE2Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MThlZDQ3NS1mYjU4LTFjNGYtYjRlYi1lMzE0NTQwZTU0MTYiIHN0RXZ0OndoZW49IjIwMjMtMDYtMDlUMTQ6MTM6MDkrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZGQ3NzAzNzYtYzI3Ni1mZjRhLWE4NDgtZGM3MDlhNzQ4NDA1IiBzdEV2dDp3aGVuPSIyMDIzLTA2LTA5VDE1OjI3OjM5KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ksCX4gAAAJpJREFUOI3Vzz0OAWEUhtHzfZVOawkkWlNLZiHsw0aUOluwDNVQW4Fi+lEQETF+xlV4utucvDfVZTHBCiMk3WqwwzzVZVFdsIh2GcMgDIZZ9zcflXIgBrqCBxwjwSmWn4CtC17VBrYu6Aret8Y2ElxgEwm+3f+CYwxu7j56T+5rqS6LJmbbuZ+8HLmwydgHgvuMGSrfLW0uxuwEfSgbTwXTcyIAAAAASUVORK5CYII=" />
        <img v-show="$store.state.select != '/trading-list'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAANlJREFUOE/tlbGqAjEQRe/AfoXgBwjbJOO3qJ2d32JprY1a+az8kR1SqY2ttWDvlYjKIou+XVO84k0Xwpzc4SY34pzrisgCQEdEBA2KJAHsSA7Fe78FcAQwFZG4UbtIRiEjAK0IvAAYmNm6NqnU4L3vAViJqkbF/RRAEfn5G8A8z9tZlp1DCKfH1HHkxgpV9QBgVhTF+FfAKgVlw2oDqxqSAp1zA5L7EEKI4K8VvgL+gTe/3t5DVd2Q3JjZ/G6CkVya2aRq/RHYJCS+eilVBz6ByeMrecCm/gKu1zQ6Apwn4U4AAAAASUVORK5CYII=" />
      </div>
      <div :class="$store.state.select == '/trading-list' ? 'blueFont' : ''">行情</div>
    </div>
    <div :class="touch == 3 ? 'footDemos' : 'footDemo'" @click="goRouter('/warehouse', 3)">
      <div class="footImgDeft">
        <img v-show="$store.state.select == '/warehouse'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF42lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIzLTA2LTA5VDE0OjEzOjUwKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMy0wNi0wOVQxNToyNzo0MiswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMy0wNi0wOVQxNToyNzo0MiswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpiMWUyNmU3Mi1lYjUxLTEyNDItOWEwNy1lOWVhNzNhYmVhOGYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjhmMzViMmUtYmZmOS1jODRiLTg4M2EtOGJmOTkzYjZhZDhlIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NjhmMzViMmUtYmZmOS1jODRiLTg4M2EtOGJmOTkzYjZhZDhlIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2OGYzNWIyZS1iZmY5LWM4NGItODgzYS04YmY5OTNiNmFkOGUiIHN0RXZ0OndoZW49IjIwMjMtMDYtMDlUMTQ6MTM6NTArMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YjFlMjZlNzItZWI1MS0xMjQyLTlhMDctZTllYTczYWJlYThmIiBzdEV2dDp3aGVuPSIyMDIzLTA2LTA5VDE1OjI3OjQyKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+hlFoMgAAAVNJREFUOI2t1TtOHEEQxvHfthBkGFJeAcIXAESOuADidQtY7HvY4nUKQMAN7ByOAARAYEfYiGQJFgc9IzWjpmdl8Ukjtbq++s+oVFXTeV5ZktEwNrGKRUygj1+4wjlO8dJM7GSAG/iGmdybEt3hC87Sy9A4H+B4AJjKc4r9lDOUGPawPQAoVQc7eMVu+oWb/wFL1RVLJWBErFlJf6unpO8YDljDdMF4h3ks4KHgm8Z6DSzBlnGLm+pcgq4Fsc/aYLWuW6CLQWzaph4zsCb0KRObCOIEfJT6QRynpsbxA7OZ2Bx+YjQT+x3E2cxpJgOtYZPv5FwGjVksQD+3wOCs87yyNCIWeqpg/COO2aeC5wFzAT18LRhhrAWmYvTqWT7BUUtCSUcV48366uJQ3ByD6rXK6dYXKbAvrqIt3A8Au6+8O5Jezm1s4gba8P4v4EJcrr1m4j88QE3R9O4F1gAAAABJRU5ErkJggg==" />
        <img v-show="$store.state.select != '/warehouse'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAtFJREFUOE+Vlc9rU0EQx7/zXmNurWfRgjQg2JLm7faqmIt4EOyhFcS/QGy1PwSxf0BF0Fqagn+BF1v8RQ/iRdFrdzcJVCimFETFa9pg0/S9HdmQhtf4InWPM7OftzPznXmEhDM4OHgilUqN+74/yswjAE4RkWXmX0S0HkXRq4ODg9WNjY1G53XqNARBMOZ53hMA/cxcBvAZwLdWXD+AC0SUdTZmntZav4wz4kBPSrkIYIKZ34dhOFcul3VSBtlsVvT09MwT0WVrbcEYMw3Autg2UEq5xMy3iei+UupxEqjTJqW8x8yPABS01lNtoJRyHMALa+2sMWbhOLDDmCAIZlyJrLXjxphVymQy6b6+vq/M/EVrfSUJlslkep29UqnsJPmFEO+I6Hy9Xs9QEAQ3iOi5tVYUi8Vi54WhoaEz6XT6AzPbKIrypVLpR2dMLpfLeZ6nmfkmSSlXAAwopUQ3GIA0AJ+Za92gUkrXwC0SQmwT0Vul1N048PBlDsbM+TAM/VQq5V6aCBVCOIVcc8B9Zp4zxjjtNU8ulzvp+/5662WXlFJbzp7NZs85KIDdWq02srm5uRtrziwRzbuU9xxQa/20E8jMPWEY5svl8rbzSSkHAHwE8LsTKISYbgJdygDeHOroEBpLOdVoNPLMTK45APastXljzM94iVopjzabwsxntdZuZo+cOLTlqCfBnE8IsU5E223ZuNJprd3sdoNG/4C52S42ZdMSdgVASSl1NUm4Usq+arXK3YQtpVwDMFytVjPNWY6N3h1jTOE/R2/S87wlANeVUivt5SCEKBDRLWae0lovHwcqhJggokVmfqa1nnR3uq2vtSiKHpRKpY0k8PDw8KDv+w+JyJVoWSnlNs3R9RUTqFuwC8x8GsA6M3/yPK+5YK21/UR0EcAIEX231s64DRP/6F8b2zldo3p7e8eIKPEXwMyvd3Z2ViuVyn5nBn8ACDOJiPW6SUQAAAAASUVORK5CYII=" />
      </div>
      <div :class="$store.state.select == '/warehouse' ? 'blueFont' : ''">持仓</div>
    </div>
    <div :class="touch == 4 ? 'footDemos' : 'footDemo'" @click="goRouter('/MyList', 4)">
      <div class="footImgDeft">
        <img v-show="$store.state.select == '/MyList'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF42lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIzLTA2LTA5VDE0OjE0OjEwKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMy0wNi0wOVQxNToyNzo0OCswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMy0wNi0wOVQxNToyNzo0OCswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpiNWNkZWQ2MC03YWFmLTUyNDEtYTNjNC1mYWU3ODgwNDZjYWYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzFiZDNlZjktZjJhMS1mNzQ5LTk5ZmEtYjI5YTg2MWY3MTQwIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MzFiZDNlZjktZjJhMS1mNzQ5LTk5ZmEtYjI5YTg2MWY3MTQwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDozMWJkM2VmOS1mMmExLWY3NDktOTlmYS1iMjlhODYxZjcxNDAiIHN0RXZ0OndoZW49IjIwMjMtMDYtMDlUMTQ6MTQ6MTArMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YjVjZGVkNjAtN2FhZi01MjQxLWEzYzQtZmFlNzg4MDQ2Y2FmIiBzdEV2dDp3aGVuPSIyMDIzLTA2LTA5VDE1OjI3OjQ4KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+d0QR9AAAANdJREFUOI211SFOA1EUBdAzDa4roA4F1RWYSkKCr8KAqcHALioJGhxp2EFVU9uUFbCCCQKDwFEGM5NMJtPpD/9z5U3eeerlZUVRSJkD+Do7vcATBn90ckz7y82iVxYxmHL2EXq1IjaDOpgsMeAWL3hPAW5xhUvMYsEKm+MQN13gM4Z4DcRWOO4CP/CG8xa0DTtpbmyCd7jFZwP9DsHawAz3DXSN6xCM8vR2oPCAMX5CsF1gGxqEdYF1dIwRjvZh+8AKnYRAVf7tlvMEVl4Hp5FoXhqy1C/gF7vLNbEtpXzSAAAAAElFTkSuQmCC" />
        <img v-show="$store.state.select != '/MyList'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAWBJREFUOE/dlD1KQ0EQx2febhJs7Gy0UEIUFJbsbswFTFJo5yG8gq0RL2Cvd7CzkCQHEN7HBp6gINjExlIbYXdHXkhAgjHPmEa33vnNx/8/g7DghxlPKbWPiJeIuDoPn4ievfdHSZJcD4Fa6wEAvADA1TxAADgEgJUoitaGwFqtRkTUjqLodB6g1voEEdthGOI/BQohysVi8cxae2yMGfyqZSnlJmOsBwBLzrndJEmevgVKKTcYY+ej7A+fRdJabyNil4g4EbXiODYjl0wXRSm1joi3iOi89804ju+yICGEKBQKHUT01tqmMSYdJ5vZslJqJwiCDhExAGg55xjn/IaI3q21jX6/fz9R+WzbVKvVLc55N5sVEQWI+AoAe2EYPk56dWaF44B6vV52zvWy9p1zjUyAr4yfG5gFVyqV5VKp5NM0fZu2RT8C5lnFPwhc+PmSUh4EQXCxsAObZ/B5/3wAcLkuJG4EsXcAAAAASUVORK5CYII=" />
      </div>
      <div :class="$store.state.select == '/MyList' ? 'blueFont' : ''">自选</div>
    </div>
    <div :class="touch == 5 ? 'footDemos' : 'footDemo'" @click="goRouter('/user', 5)">
      <div class="footImgDeft">
        <img v-show="$store.state.select == '/user'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF42lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIzLTA2LTA5VDE0OjE0OjM1KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMy0wNi0wOVQxNToyNzozMSswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMy0wNi0wOVQxNToyNzozMSswODowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjNjVmOWQ3Ny03Y2U3LWI1NGUtYmJlOC00MTIxZTQ5YWRhOWMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDBjZDBhOWUtOGM1Zi04ZTRhLThmNGUtNTYzMzg4YTdmYzUwIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MDBjZDBhOWUtOGM1Zi04ZTRhLThmNGUtNTYzMzg4YTdmYzUwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDowMGNkMGE5ZS04YzVmLThlNGEtOGY0ZS01NjMzODhhN2ZjNTAiIHN0RXZ0OndoZW49IjIwMjMtMDYtMDlUMTQ6MTQ6MzUrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4wIChXaW5kb3dzKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzY1ZjlkNzctN2NlNy1iNTRlLWJiZTgtNDEyMWU0OWFkYTljIiBzdEV2dDp3aGVuPSIyMDIzLTA2LTA5VDE1OjI3OjMxKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+R0mCiAAAAS9JREFUOI2t1D0vQ1Ecx/FPH7RJg8QgmDAYmzDUYCIGFpN4B+IdiBdgkphZxCaSWgwSo5VJIvaGidqaxoQaeptcN6dVen/JTc7/6XvuOf9zTqa5uiimedwL6wM1XOIQ9VBStktxSHnMYRePWBoUGNc4rjCdFhDGsP8f4GeXMWyi8BfgE8q4w200fo7FS5iJF+QTgK+EPaXdiLXIXsZkImeoF/AFLWQiu4AqtiK76ucSWxLHJwmsax+JcsxXxEVsgrge8BZ3hPbwIOArRt+vuSHgGU4D/qROcN4PELaxh0Yg1tC+LTuhwkziLic1ghXMajeghhs0uxV0mjIaFZa65HU6OYyNQPw9mqiRxwKuMdHrV/vQK9azOEoBJmIcZ1FJAdZRJYtcisDcIM9XUKkDvwFa/TCiIDd3EQAAAABJRU5ErkJggg==" />
        <img v-show="$store.state.select != '/user'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAnBJREFUOE+llM9rE0EUx9+byY9Sg6KCiAcRzUHcNtndAcGbLRTUgwpSQYpYQah/gBdBEEHw0quHgmAvKige6kEFUXuRgjC76yY5CCv+OIgKIpEo7G5mnkxIJNY12PSdvvvmfT883rxZhL6wbdvmnPv9uT7dJqK3ALCUJMl8vV7/nFWHWUAiOo+IfxiIqEBEFmNsFgBGlVLHgyB4sRqaCUzTdHcYhqabv0IIMQoAi0Q0RUS27/vv+4vWDDRmy7IKIyMjkogCz/NOrxXIAEB3Tb+167qziHi92WxuiaIo7kEHdiiE2ElEj5RSZ42Bc34TEQ9LKT84jrOPMdZI03RvGIavM4Gu61YQ8VUcx+V6vf5GCJEnorsAcLBrWEbEk1LKdGxsbE+xWIwAoCKlrGUCK5XKtnw+/0kpNRkEwXJvXsVi8Z7RcRxPNxqNxOhqtTqRy+Wepmm6PQzDL5lAkxRChES04nneXK/IXILRPZjRrusuIOIBKWXln5fSLZxBxEWl1JEgCJ5krY5t21Oc84cAcEZKeXsgsNvlDQCY0VpfabfbC7Va7ZvJj4+Pb87lcnOMscta61u+758buNh9h+i67gVEvAQAGwDgY/dsBwD8IKKrnufNAwD9L7BTZ1lWqVAoTDLGdplvrfW7JEmeNRqNVtYoTK6zh+VyeWOpVJpARPOs1hxE9LPVaj2Poug7VqtVh3P+GBG3AkBnJYYI8+P4qpQ6ZGa1YuaCiCeklM0hYGbVNhHRfTNvFEK0lVKngiDoLO+wYdv2NOf8jgGS1vqY7/sPhoUZn+M4RxljSz3gNcbYy/UAtdb7GWMXO8D1gFZ7fwFprSac5VGXcwAAAABJRU5ErkJggg==" />
      </div>
      <div :class="$store.state.select == '/user' ? 'blueFont' : ''">{{ $t('hj227') }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      touch: 0,
    }
  },
  mounted() {

  },
  methods: {
    goRouter(url, index) {
      // if (index == 3 || index == 4) {
      //   if (window.localStorage.getItem('USERTOKEN') == "" || window.localStorage.getItem('USERTOKEN') == null || window.localStorage.getItem('USERTOKEN') == undefined) {
      //     this.$emit('close')
      //     return;
      //   }
      // }
      this.touch = index
      setTimeout(() => {
        this.touch = 0
      }, 500)
      this.$router.push(url)
      if (navigator.vibrate) {
        // 支持
        navigator.vibrate([55]);
      }
    }
  },

}
</script>

<style>
.footCss {
  border-top: 0.01rem solid rgba(192, 192, 192, 0.1);
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.3rem;
  display: flex;
  justify-content: space-around;
}

.footDemo {
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-size: 0.32rem;
  color: #999;
}

.footDemos {
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-size: 0.32rem;
}

.footDemos::before {
  content: '';
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 100%;
  position: absolute;
  background-color: rgba(25, 122, 246, 0.14);
  -webkit-animation: footBlueBg 0.5s linear infinite;
  animation: footBlueBg 0.5s linear infinite;
  transition: all 0.5s;
}

@-webkit-keyframes footBlueBg {
  0% {
    -webkit-transform: scale(1.6);
    transform: scale(1.6);
  }

  25% {
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
  }

  50% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  75% {
    background-color: rgba(25, 122, 246, 0.1);

  }

  100% {
    background-color: rgba(25, 122, 246, 0);
  }
}

.footImgDeft {
  width: 0.46rem;
  height: 0.46rem;
  margin-bottom: 0.14rem;

}

.footImgDeft img {
  width: 100%;
  height: 100%;
}

.homeImgOut {
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 100%;
  background-color: rgb(25, 122, 246);
}

.homeImg {
  width: 0.9rem;
  height: 0.9rem;
}

.homeImg img {
  width: 100%;
  height: 100%;
}

.blueFont {
  color: #F44336;
}
</style>
