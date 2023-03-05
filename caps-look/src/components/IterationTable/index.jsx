import style from './style.module.scss'
const IterationTable = () => {
  let secondLine = [
    'PI',
    '1W',
    '2W',
    '3W',
    '4W',
    '5W',
    '6W',
    '7W',
    '8W',
    '9W',
    '10W',
    '11W',
    '12W',
    '13W',
    '14W',
    '15W'
  ]
  let lines = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
  let firstLine = [
    'November 2022',
    'December 2022',
    'January 2023',
    'February 2023'
  ]
  let source = ['', '', '', '', '']
  var colors = []
  while (colors.length < 100) {
    do {
      var x = Math.floor(Math.random() * 256)
      var y = Math.floor(Math.random() * 256)
      var z = Math.floor(Math.random() * 256)
      var bgColor = 'rgb(' + x + ',' + y + ',' + z + ')'
    } while (colors.indexOf(bgColor) >= 0)
    colors.push(bgColor)
  }
  let i = 0
  return (
    <div className={style.innerContainer}>
      <div className={style.scrollmenu}>
        <div className={style.tableBody}>
          <table>
            {firstLine.map((e) => {
              return (
                <td
                  style={{
                    width: `83%`,
                    color: '#6B7A99',
                    font: 'bold'
                  }}
                  className={style.dataNode}
                >
                  {e}
                </td>
              )
            })}
          </table>
          <table>
            <tr className={style.dataContainer}>
              {secondLine.map((e) => {
                return (
                  <td
                    style={{
                      width: `20%`,
                      color: '#ADB8CC'
                    }}
                    className={style.dataNode}
                  >
                    {e}
                  </td>
                )
              })}
            </tr>
            {source.map((data, indexData) => {
              return (
                <tr className={style.dataContainer}>
                  {lines.map((e, index) => {
                    return (
                      <td
                        style={{
                          width: `20%`
                        }}
                        className={style.dataNode}
                      >
                        {index == 0 ? (
                          <span
                            class={style.dot}
                            style={{ backgroundColor: colors[indexData] }}
                          >
                            {indexData}
                          </span>
                        ) : (index - indexData + 1) % (16 + indexData) == 1 ||
                          (index - indexData + 1) % (16 + indexData) == 2 ? (
                          <div>
                            <span class={style.mileStoneCir}>
                              <span class={style.mileStoneHover}>
                                <p class={style.t}>
                                  <font size="+4">20</font>December <br></br>
                                  <br></br>
                                  Milestone:
                                  <br></br>
                                  <br></br>
                                  <div class={style.mileStoneName}>Cut-off</div>
                                </p>
                              </span>
                            </span>
                            <div
                              class={style.IteRec}
                              style={{ backgroundColor: colors[indexData] }}
                            ></div>
                          </div>
                        ) : null}
                      </td>
                    )
                    {
                    }
                  })}
                </tr>
              )
              {
              }
            })}
          </table>
        </div>
      </div>
    </div>
  )
}
export default IterationTable
