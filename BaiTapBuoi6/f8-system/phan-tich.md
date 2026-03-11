**Câu 1: Selector nào có độ ưu tiên cao nhất trong CSS?**
Trong CSS, Inline style có độ ưu tiên cao nhất.

**Câu 2: Nếu một phần tử HTML có cả `h1`, `.title`, và `#main` cùng set `color` — selector nào thắng? Tại sao?**
Selector `#main` (ID) sẽ thắng.
Do ID > Class > Tag, nên màu của `#main` sẽ được áp dụng.

**Câu 3: Nếu bạn thêm `style="color: pink"` trực tiếp vào phần tử ở Câu 2, kết quả thay đổi như thế nào?**
Màu của phần tử sẽ lập tức đổi thành `pink`. Vì Inline style có độ ưu tiên tuyệt đối cao hơn ID selector và nó sẽ ghi đè tất cả các CSS viết trong thẻ `<style>` hoặc file CSS bên ngoài.

**Câu 4: Tại sao `theme.css` có thể override style từ `base.css`? Điều kiện để override thành công là gì?**
Vì khi ta nhúng `<link rel="stylesheet" href="../css/theme.css">` nằm *ngay bên dưới* thẻ link của `base.css` trong HTML, trình duyệt sẽ đọc `theme.css` sau cùng.
Điều kiện để override thành công: Selector viết trong `theme.css` phải có độ ưu tiên **lớn hơn hoặc bằng** độ ưu tiên của selector tương ứng trong `base.css`.

**Câu 5: Trong project của bạn, có hai phần tử đều dùng class `.title` nhưng hiển thị màu khác nhau. Giải thích tại sao.**
Lý do là vì tính cụ thể (Specificity) tác động lên chúng khác nhau:
- Thẻ `h1` có gán thêm ID là `#main` (và cả inline style), ID có độ ưu tiên cao hơn class nên nó lấy màu của ID/Inline thay vì màu của `.title`.
- Thẻ `h2` chỉ có class `.title` nên nó lấy đúng màu được định nghĩa cho `.title` trong `theme.css`.

**Câu 6: Phần tử nào trong project của bạn có CSS phức tạp nhất? Liệt kê các selector tác động lên nó và giải thích selector nào thắng cuối cùng.**
Phần tử có CSS phức tạp nhất là thẻ `h1` tại trang `home/index.html`:
`<h1 class="title" id="main" style="color: black;">HOME PAGE</h1>`

Các selector tác động lên nó bao gồm:
1. Tag Selector: `h1` (từ `base.css`)
2. Class Selector: `.title` (từ `base.css` và `theme.css`)
3. ID Selector: `#main` (từ `base.css`)
4. Internal CSS: `h1.title#main` (từ cặp thẻ `<style>` trên head)
5. Inline Style: `style="color: black;"`

**Selector thắng cuối cùng:** Inline Style (`color: black;`).
Bất chấp các file CSS ngoài hay CSS nội bộ có dùng sự kết hợp phức tạp thế nào đi nữa, Inline Style luôn có giá trị Specificity cao nhất (1000). Trừ khi ta dùng `!important` ở các selector kia, còn không Inline Style sẽ luôn luôn chiến thắng.