export default function MyCard() {
    return (
        <div className="flex flex-col gap-2 bg-white px-10 py-12 rounded-2xl m-1 border border-gray-200">
                <h1>내 메뉴</h1>

                {/* 내 메뉴 */}
                <div>
                    메뉴
                </div>

                <hr />

                <p>배달비 </p>
                <p>총 ...원</p>

                <div>
                    계좌번호
                </div>
            </div>
    )
}