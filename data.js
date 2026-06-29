const siteData = {
    brand: {
        name: "Chans",
        subtitle: "Gội Đầu Dưỡng Sinh"
    },
    nav: [
        { href: "#home", label: "Trang chủ" },
        { href: "#about", label: "Giới thiệu" },
        { href: "#process", label: "Quy trình" },
        { href: "#pricing", label: "Bảng giá" },
        { href: "#benefits", label: "Lợi ích" },
        { href: "#booking", label: "Đặt lịch" },
        { href: "#contact", label: "Liên hệ" }
    ],
    heroSlides: [
        "https://images.unsplash.com/photo-1519821172141-b5d8b7d2f1d0?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80"
    ],
    about: [
        {
            icon: "fa-spa",
            title: "Không gian thư giãn",
            desc: "Thiết kế ấm cúng, yên tĩnh giúp bạn thả lỏng hoàn toàn ngay từ khi bước vào."
        },
        {
            icon: "fa-hand-sparkles",
            title: "Kỹ thuật chuyên nghiệp",
            desc: "Đội ngũ chăm sóc tận tâm, thao tác nhẹ nhàng, đúng quy trình dưỡng sinh."
        },
        {
            icon: "fa-leaf",
            title: "Sản phẩm thiên nhiên",
            desc: "Ưu tiên nguyên liệu dịu nhẹ, an toàn cho da đầu và mái tóc."
        }
    ],
    process: [
        { no: "01", title: "Chào đón & tư vấn", desc: "Lắng nghe nhu cầu để lựa chọn gói phù hợp.", icon: "fa-comments" },
        { no: "02", title: "Làm sạch tóc", desc: "Gội sạch bụi bẩn bằng sản phẩm dịu nhẹ.", icon: "fa-droplet" },
        { no: "03", title: "Massage da đầu", desc: "Kích thích tuần hoàn máu và giảm căng thẳng.", icon: "fa-hand" },
        { no: "04", title: "Ấn huyệt cổ vai gáy", desc: "Hỗ trợ thư giãn sâu và giảm mỏi cơ.", icon: "fa-bone" },
        { no: "05", title: "Ủ dưỡng", desc: "Bổ sung độ ẩm, nuôi dưỡng tóc mềm mượt hơn.", icon: "fa-wind" },
        { no: "06", title: "Sấy tạo kiểu", desc: "Hoàn thiện mái tóc gọn gàng và tự nhiên.", icon: "fa-scissors" }
    ],
    pricing: [
        {
            type: "basic",
            name: "Gói Cơ Bản",
            icon: "fa-leaf",
            price: "39.000đ",
            time: "25 phút",
            items: [
                "Bấm huyệt khai môn",
                "Gội sạch hai lần",
                "Massage đầu",
                "Xả tóc & gỡ rối",
                "Sấy tóc & xịt dưỡng"
            ]
        },
        {
            type: "featured",
            name: "Gói Chuyên Dùng",
            icon: "fa-spa",
            price: "79.000đ",
            time: "45 phút",
            items: [
                "Bấm huyệt khai môn",
                "Gội sạch hai lần",
                "Massage mặt + Tẩy tế bào chết + Rửa mặt",
                "Massage đầu",
                "Xả tóc + Ủ tóc + Gỡ rối",
                "Sấy tóc + Xịt dưỡng (Có đắp mặt nạ)",
                "Ngâm chân thư giãn"
            ]
        },
        {
            type: "vip",
            name: "Gói VIP",
            icon: "fa-crown",
            price: "199.000đ",
            time: "90 phút",
            split: [
                ["Các bước thực hiện (1 - 5)", [
                    "1. Bấm huyệt khai môn",
                    "2. Gội sạch hai lần",
                    "3. Massage đầu + Gỡ rối",
                    "4. Massage mặt + Tẩy tế bào chết + Rửa mặt",
                    "5. Massage vai cổ"
                ]],
                ["Các bước thực hiện (6 - 9)", [
                    "6. Massage lưng + Giãn cơ lưng",
                    "7. Xả tóc + Ủ tóc dưỡng sâu",
                    "8. Sấy tóc + Xịt dưỡng cao cấp",
                    "9. Ngâm chân thuốc"
                ]]
            ]
        }
    ],
    benefits: [
        ["💆", "Giảm căng thẳng", "Giúp cơ thể và tinh thần thư giãn sau ngày dài mệt mỏi."],
        ["🫧", "Làm sạch sâu", "Loại bỏ bụi bẩn và bã nhờn tích tụ trên da đầu."],
        ["🌿", "Nuôi dưỡng tóc", "Hỗ trợ tóc mềm mượt, khỏe hơn và giảm khô xơ."],
        ["😌", "Cải thiện giấc ngủ", "Thư giãn sâu giúp bạn dễ chịu và ngủ ngon hơn."]
    ],
    reviews: [
        ["⭐⭐⭐⭐⭐", "Dịch vụ rất tốt, nhân viên thân thiện và chuyên nghiệp. Mình thấy thư giãn lắm sau khi gội đầu dưỡng sinh ở đây!", "Minh Thư", "Khách hàng quen", "M"],
        ["⭐⭐⭐⭐⭐", "Không gian spa rất đẹp và yên tĩnh. Tinh dầu thơm lắm, massage đầu siêu thư giãn. Sẽ quay lại!", "Thanh Hằng", "Khách hàng mới", "T"],
        ["⭐⭐⭐⭐⭐", "Gói VIP rất đáng đồng tiền bát gạo. 90 phút thư giãn tuyệt vời, massage cổ vai gáy rất chuyên nghiệp.", "Ngọc Anh", "Khách hàng quen", "N"]
    ],
    contacts: {
        address: "51B Cao Thắng Phường Langbiang - Đà Lạt, Lâm Đồng",
        phones: ["0786 766 382", "0909 123 456"],
        email: "chans.spa@gmail.com",
        facebook: "https://www.facebook.com/profile.php?id=61591101135954&mibextid=wwXIfr",
        zalo: "https://zalo.me/0786766382"
    }
};