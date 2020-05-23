! function(e) {
    "use strict";
    var t = "desktop";
    "function" == typeof window.matchMedia ? (e(window).on("resize seocrawler-set-display", function() {
        t = window.matchMedia("(max-width: 419px)").matches ? "mobile-portrait" : window.matchMedia("(max-width: 767px)").matches ? "mobile-landscape" : window.matchMedia("(max-width: 959px)").matches ? "tablet" : "desktop"
    }), e(window).trigger("seocrawler-set-display")) : (e(window).on("resize seocrawler-set-display", function() {
        t = e(window).innerWidth() <= 419 ? "mobile-portrait" : e(window).innerWidth() <= 767 ? "mobile-landscape" : e(window).innerWidth() <= 959 ? "tablet" : "desktop"
    }), e(window).trigger("seocrawler-set-display"));
    var n = function(e, t, n) {
            var s;
            return function() {
                function i() {
                    n || e.apply(a, o), s = null
                }
                var a = this,
                    o = arguments;
                s ? clearTimeout(s) : n && e.apply(a, o), s = setTimeout(i, t)
            }
        },
        s = function(e, t) {
            var n;
            return function() {
                function s() {
                    e.apply(i, a), n = null
                }
                var i = this,
                    a = arguments;
                n || (n = setTimeout(s, t))
            }
        },
        i = function(e) {
            0 != e.length && (this.main_menu = e, this.current_menu = this.main_menu.children(".sf-menu").children(".current-menu-item, .current-menu-ancestor").children("a"), this.init())
        };
    i.prototype = {
        init: function() {
            var t = this;
            t.sf_menu_mod(), "function" == typeof e.fn.superfish && (t.main_menu.superfish({
                delay: 400,
                speed: "fast"
            }), t.sf_menu_position(), e(window).resize(n(function() {
                t.sf_menu_position()
            }, 300)))
        },
        sf_menu_mod: function() {
            this.main_menu.find(".sf-mega > ul").each(function() {
                var t = e("<div></div>"),
                    n = e('<div class="sf-mega-section-wrap" ></div>'),
                    s = 0;
                e(this).children("li").each(function() {
                    var i = parseInt(e(this).attr("data-size"));
                    s + i <= 60 ? s += i : (s = i, t.append(n), n = e('<div class="sf-mega-section-wrap" ></div>')), n.append(e('<div class="sf-mega-section" ></div>').addClass("seocrawler-column-" + i).html(e('<div class="sf-mega-section-inner" ></div>').addClass(e(this).attr("class")).attr("id", e(this).attr("id")).html(e(this).html())))
                }), t.append(n), e(this).replaceWith(t.html())
            })
        },
        sf_menu_position: function() {
            if ("mobile-landscape" != t && "mobile-portrait" != t && "tablet" != t) {
                var n = e(".seocrawler-body-wrapper"),
                    s = this.main_menu.find(".sf-menu > li.seocrawler-normal-menu .sub-menu");
                s.css({
                    display: "block"
                }).removeClass("sub-menu-right"), s.each(function() {
                    e(this).offset().left + e(this).width() > n.outerWidth() && e(this).addClass("sub-menu-right")
                }), s.css({
                    display: "none"
                }), this.main_menu.find(".sf-menu > li.seocrawler-mega-menu .sf-mega").each(function() {
                    e(this).hasClass("sf-mega-full") || (e(this).css({
                        display: "block"
                    }), e(this).css({
                        right: "",
                        "margin-left": -(e(this).width() - e(this).parent().outerWidth()) / 2
                    }), e(this).offset().left + e(this).width() > e(window).width() && e(this).css({
                        right: 0,
                        "margin-left": ""
                    }), e(this).css({
                        display: "none"
                    }))
                })
            }
        }
    }, e.fn.seocrawler_mobile_menu = function(t) {
        var n = e(this).siblings(".seocrawler-mm-menu-button"),
            s = {
                navbar: {
                    title: '<span class="mmenu-custom-close" ></span>'
                },
                extensions: ["pagedim-black"]
            },
            i = {
                offCanvas: {
                    pageNodetype: ".seocrawler-body-outer-wrapper"
                }
            };
        if (e(this).find('a[href="#"]').each(function() {
                var t = e(this).html();
                e('<span class="seocrawler-mm-menu-blank" ></span>').html(t).insertBefore(e(this)), e(this).remove()
            }), e(this).attr("data-slide")) {
            var a = "seocrawler-mmenu-" + e(this).attr("data-slide");
            e("html").addClass(a), s.offCanvas = {
                position: e(this).attr("data-slide")
            }
        }
        e(this).mmenu(s, i);
        var o = e(this).data("mmenu");
        e(this).find("a").not(".mm-next, .mm-prev").on('click',function() {
            o.close()
        }), e(this).find(".mmenu-custom-close").on('click',function() {
            o.close()
        }), o.bind("open", function(e) {
            n.addClass("seocrawler-active")
        }), o.bind("close", function(e) {
            n.removeClass("seocrawler-active")
        })
    };
    var a = function(e) {
        this.menu = e, this.menu_button = e.children(".seocrawler-overlay-menu-icon"), this.menu_content = e.children(".seocrawler-overlay-menu-content"), this.menu_close = this.menu_content.children(".seocrawler-overlay-menu-close"), this.init()
    };
    a.prototype = {
        init: function() {
            var t = this,
                n = 0;
            t.menu_content.appendTo("body"), t.menu_content.find("ul.menu > li").each(function() {
                e(this).css("transition-delay", 150 * n + "ms"), n++
            }), t.menu_button.on('click',function() {
                return e(this).addClass("seocrawler-active"), t.menu_content.fadeIn(200, function() {
                    e(this).addClass("seocrawler-active")
                }), !1
            }), t.menu_close.on('click',function() {
                return t.menu_button.removeClass("seocrawler-active"), t.menu_content.fadeOut(400, function() {
                    e(this).removeClass("seocrawler-active")
                }), t.menu_content.find(".sub-menu").slideUp(200).removeClass("seocrawler-active"), !1
            }), t.menu_content.find("a").on('click',function(n) {
                var s = e(this).siblings(".sub-menu");
                if (s.length > 0) {
                    if (!s.hasClass("seocrawler-active")) {
                        var i = s.closest("li").siblings().find(".sub-menu.seocrawler-active");
                        return i.length > 0 ? (i.removeClass("seocrawler-active").slideUp(150), s.delay(150).slideDown(400, "easeOutQuart").addClass("seocrawler-active")) : s.slideDown(400, "easeOutQuart").addClass("seocrawler-active"), e(this).addClass("seocrawler-no-preload"), !1
                    }
                    e(this).removeClass("seocrawler-no-preload")
                } else t.menu_close.trigger("click")
            })
        }
    };
    var o = function(e) {
        0 != e.length && (this.prev_scroll = 0, this.side_nav = e, this.side_nav_content = e.children(), this.init())
    };
    o.prototype = {
        init: function() {
            var n = this;
            n.init_nav_bar_element(), e(window).resize(function() {
                n.init_nav_bar_element()
            }), e(window).scroll(function() {
                if ("mobile-landscape" != t && "mobile-portrait" != t && "tablet" != t && n.side_nav.hasClass("seocrawler-allow-slide")) {
                    var s = parseInt(e("html").css("margin-top")),
                        i = e(window).scrollTop() > n.prev_scroll;
                    if (n.prev_scroll = e(window).scrollTop(), i) n.side_nav.hasClass("seocrawler-fix-bottom") || (n.side_nav.hasClass("seocrawler-fix-top") ? (n.side_nav.css("top", n.side_nav.offset().top), n.side_nav.removeClass("seocrawler-fix-top")) : e(window).height() + e(window).scrollTop() > n.side_nav_content.offset().top + n.side_nav_content.outerHeight() && (n.side_nav.hasClass("seocrawler-fix-bottom") || (n.side_nav.addClass("seocrawler-fix-bottom"), n.side_nav.css("top", ""))));
                    else if (!n.side_nav.hasClass("seocrawler-fix-top"))
                        if (n.side_nav.hasClass("seocrawler-fix-bottom")) {
                            var a = e(window).scrollTop() + (e(window).height() - s) - n.side_nav_content.outerHeight();
                            n.side_nav.css("top", a), n.side_nav.removeClass("seocrawler-fix-bottom")
                        } else e(window).scrollTop() + s < n.side_nav_content.offset().top && (n.side_nav.hasClass("seocrawler-fix-top") || (n.side_nav.addClass("seocrawler-fix-top"), n.side_nav.css("top", "")))
                }
            })
        },
        init_nav_bar_element: function() {
            if ("mobile-landscape" != t && "mobile-portrait" != t && "tablet" != t) {
                var n = this,
                    s = n.side_nav_content.children(".seocrawler-pos-middle").addClass("seocrawler-active"),
                    i = n.side_nav_content.children(".seocrawler-pos-bottom").addClass("seocrawler-active");
                n.side_nav_content.children(".seocrawler-pre-spaces").remove(), e(window).height() < n.side_nav_content.height() ? n.side_nav.addClass("seocrawler-allow-slide") : (n.side_nav.removeClass("seocrawler-allow-slide seocrawler-fix-top seocrawler-fix-bottom").css("top", ""), n.side_nav.hasClass("seocrawler-style-middle") && s.each(function() {
                    var t = parseInt(e(this).css("padding-top")),
                        s = (n.side_nav.height() - (n.side_nav_content.height() - t)) / 2 - t;
                    s > 0 && e('<div class="seocrawler-pre-spaces" ></div>').css("height", s).insertBefore(e(this))
                }), i.each(function() {
                    var t = n.side_nav.height() - n.side_nav_content.height();
                    t > 0 && e('<div class="seocrawler-pre-spaces" ></div>').css("height", t).insertBefore(e(this))
                }))
            }
        }
    };
    var r = function() {
        this.anchor_link = e('a[href*="#"]').not('[href="#"]').filter(function() {
            return !e(this).is(".seocrawler-mm-menu-button, .mm-next, .mm-prev, .mm-title") && (!e(this).is(".fbx-btn-transition") && (!e(this).parent(".description_tab, .reviews_tab").length && !e(this).closest(".woocommerce").length))
        }), this.anchor_link.length && (this.menu_anchor = e("#seocrawler-main-menu, #seocrawler-bullet-anchor"), this.home_anchor = this.menu_anchor.find("ul.sf-menu > li.current-menu-item > a, ul.sf-menu > li.current-menu-ancestor > a, .seocrawler-bullet-anchor-link.current-menu-item"), this.init())
    };
    r.prototype = {
        init: function() {
            var t = this;
            t.animate_anchor(), t.scroll_section(), t.menu_anchor.filter("#seocrawler-bullet-anchor").each(function() {
                e(this).css("margin-top", -t.menu_anchor.height() / 2).addClass("seocrawler-init")
            });
            var n = window.location.hash;
            n && setTimeout(function() {
                t.menu_anchor.find('a[href*="' + n + '"]');
                t.scroll_to(n, !1, 300)
            }, 500)
        },
        animate_anchor: function() {
            var t = this;
            t.home_anchor.on('click',function() {
                if (window.location.href == this.href) return e("html, body").animate({
                    scrollTop: 0
                }, {
                    duration: 1500,
                    easing: "easeOutQuart"
                }), !1
            }), t.anchor_link.on('click',function() {
                if (location.hostname == this.hostname && location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "")) return t.scroll_to(this.hash, !0)
            })
        },
        scroll_to: function(t, n, s) {
            if ("#seocrawler-top-anchor" == t) a = 0;
            else {
                var i = e(t);
                if (i.length) var a = i.offset().top
            }
            return void 0 !== a ? (a -= parseInt(e("html").css("margin-top")), void 0 !== window.seocrawler_anchor_offset && (a -= parseInt(window.seocrawler_anchor_offset)), a < 0 && (a = 0), e("html, body").animate({
                scrollTop: a
            }, {
                duration: 1500,
                easing: "easeOutQuart",
                queue: !1
            }), !1) : n ? (window.location.href = seocrawler_script_core.home_url + t, !1) : void 0
        },
        scroll_section: function() {
            var n = this,
                s = this.menu_anchor.find('a[href*="#"]').not('[href="#"]');
            if (s.length) {
                var i = e("#seocrawler-page-wrapper"),
                    a = i.find("div[id], section[id]");
                a.length && (s.each(function() {
                    0 == e(this).closest(".sub-menu").length && e(this.hash).length && e(this).attr("data-anchor", this.hash)
                }), e(window).scroll(function() {
                    if ("mobile-landscape" != t && "mobile-portrait" != t && "tablet" != t)
                        if (n.home_anchor.length && e(window).scrollTop() < i.offset().top) n.home_anchor.each(function() {
                            e(this).hasClass("seocrawler-bullet-anchor-link") ? (e(this).addClass("current-menu-item").siblings().removeClass("current-menu-item"), e(this).parent(".seocrawler-bullet-anchor").attr("data-anchor-section", "seocrawler-home")) : e(this).parent(".current-menu-item, .current-menu-ancestor").length || e(this).parent().addClass("current-menu-item").siblings().removeClass("current-menu-item current-menu-ancestor")
                        });
                        else {
                            var o = e(window).scrollTop() + e(window).height() / 2;
                            a.each(function() {
                                if ("none" != e(this).css("display")) {
                                    var t = e(this).offset().top;
                                    if (o > t && o < t + e(this).outerHeight()) {
                                        var n = e(this).attr("id");
                                        return s.filter('[data-anchor="#' + n + '"]').each(function() {
                                            e(this).hasClass("seocrawler-bullet-anchor-link") ? (e(this).addClass("current-menu-item").siblings().removeClass("current-menu-item"), e(this).parent(".seocrawler-bullet-anchor").attr("data-anchor-section", n)) : e(this).parent("li.menu-item").length && !e(this).parent("li.menu-item").is(".current-menu-item, .current-menu-ancestor") && e(this).parent("li.menu-item").addClass("current-menu-item").siblings().removeClass("current-menu-item current-menu-ancestor")
                                        }), !1
                                    }
                                }
                            })
                        }
                }))
            }
        }
    };
    var l = function() {
        this.sticky_nav = e(".seocrawler-with-sticky-navigation .seocrawler-sticky-navigation"), this.mobile_menu = e("#seocrawler-mobile-header"), this.sticky_nav.length ? this.init() : (this.style_mobile_slide(), e(window).trigger("seocrawler-set-sticky-mobile-navigation"))
    };
    l.prototype = {
        init: function() {
            var t = this;
            t.sticky_nav.hasClass("seocrawler-style-fixed") ? t.style_fixed() : t.sticky_nav.hasClass("seocrawler-style-slide") && t.style_slide(), t.style_mobile_slide(), t.sticky_nav.hasClass("seocrawler-sticky-navigation-height") ? (window.seocrawler_anchor_offset = t.sticky_nav.outerHeight(), e(window).resize(function() {
                window.seocrawler_anchor_offset = t.sticky_nav.outerHeight()
            })) : t.sticky_nav.attr("data-navigation-offset") ? window.seocrawler_anchor_offset = parseInt(t.sticky_nav.attr("data-navigation-offset")) : window.seocrawler_anchor_offset = 75, e(window).trigger("seocrawler-set-sticky-navigation"), e(window).trigger("seocrawler-set-sticky-mobile-navigation")
        },
        style_fixed: function() {
            var n = this,
                s = e('<div class="seocrawler-sticky-menu-placeholder" ></div>');
            e(window).on("scroll seocrawler-set-sticky-navigation", function() {
                if ("mobile-landscape" != t && "mobile-portrait" != t && "tablet" != t) {
                    var i = parseInt(e("html").css("margin-top"));
                    n.sticky_nav.hasClass("seocrawler-fixed-navigation") ? e(window).scrollTop() + i <= s.offset().top && (n.sticky_nav.hasClass("seocrawler-without-placeholder") || n.sticky_nav.height(s.height()), n.sticky_nav.insertBefore(s), n.sticky_nav.removeClass("seocrawler-fixed-navigation"), s.remove(), setTimeout(function() {
                        n.sticky_nav.removeClass("seocrawler-animate-fixed-navigation")
                    }, 10), setTimeout(function() {
                        n.sticky_nav.css("height", ""), e(window).trigger("seocrawler-navigation-slider-bar-animate")
                    }, 200)) : e(window).scrollTop() + i > n.sticky_nav.offset().top && (n.sticky_nav.hasClass("seocrawler-without-placeholder") || s.height(n.sticky_nav.outerHeight()), s.insertAfter(n.sticky_nav), e("body").append(n.sticky_nav), n.sticky_nav.addClass("seocrawler-fixed-navigation"), setTimeout(function() {
                        n.sticky_nav.addClass("seocrawler-animate-fixed-navigation")
                    }, 10), setTimeout(function() {
                        n.sticky_nav.css("height", ""), e(window).trigger("seocrawler-navigation-slider-bar-animate")
                    }, 200))
                }
            })
        },
        style_slide: function() {
            var n = this,
                s = e('<div class="seocrawler-sticky-menu-placeholder" ></div>');
            e(window).on("scroll seocrawler-set-sticky-navigation", function() {
                if ("mobile-landscape" != t && "mobile-portrait" != t && "tablet" != t) {
                    var i = parseInt(e("html").css("margin-top"));
                    if (n.sticky_nav.hasClass("seocrawler-fixed-navigation")) {
                        if (e(window).scrollTop() + i <= s.offset().top + s.height() + 200) {
                            var a = n.sticky_nav.clone();
                            a.insertAfter(n.sticky_nav), a.slideUp(200, function() {
                                e(this).remove()
                            }), n.sticky_nav.insertBefore(s), s.remove(), n.sticky_nav.removeClass("seocrawler-fixed-navigation seocrawler-animate-fixed-navigation"), n.sticky_nav.css("display", "block"), e(window).trigger("seocrawler-navigation-slider-bar-animate")
                        }
                    } else e(window).scrollTop() + i > n.sticky_nav.offset().top + n.sticky_nav.outerHeight() + 200 && (n.sticky_nav.hasClass("seocrawler-without-placeholder") || s.height(n.sticky_nav.outerHeight()), s.insertAfter(n.sticky_nav), n.sticky_nav.css("display", "none"), e("body").append(n.sticky_nav), n.sticky_nav.addClass("seocrawler-fixed-navigation seocrawler-animate-fixed-navigation"), n.sticky_nav.slideDown(200), e(window).trigger("seocrawler-navigation-slider-bar-animate"))
                }
            })
        },
        style_mobile_slide: function() {
            var n = this,
                s = e('<div class="seocrawler-sticky-mobile-placeholder" ></div>');
            e(window).on("scroll seocrawler-set-sticky-mobile-navigation", function() {
                if ("mobile-landscape" == t || "mobile-portrait" == t || "tablet" == t) {
                    var i = parseInt(e("html").css("margin-top"));
                    if (n.mobile_menu.hasClass("seocrawler-fixed-navigation")) {
                        if (e(window).scrollTop() + i <= s.offset().top + s.height() + 200) {
                            var a = n.mobile_menu.clone();
                            a.insertAfter(n.mobile_menu), a.slideUp(200, function() {
                                e(this).remove()
                            }), n.mobile_menu.insertBefore(s), s.remove(), n.mobile_menu.removeClass("seocrawler-fixed-navigation"), n.mobile_menu.css("display", "block")
                        }
                    } else e(window).scrollTop() + i > n.mobile_menu.offset().top + n.mobile_menu.outerHeight() + 200 && (s.height(n.mobile_menu.outerHeight()).insertAfter(n.mobile_menu), e("body").append(n.mobile_menu), n.mobile_menu.addClass("seocrawler-fixed-navigation"), n.mobile_menu.css("display", "none").slideDown(200))
                }
            })
        }
    };
    var c = function() {
        this.heading_font = e("h1, h2, h3, h4, h5, h6"), this.init()
    };
    c.prototype = {
        init: function() {
            var t = this;
            t.resize(), e(window).on("resize", s(function() {
                t.resize()
            }, 100))
        },
        resize: function() {
            var n = this;
            "mobile-landscape" == t || "mobile-portrait" == t ? n.heading_font.each(function() {
                parseInt(e(this).css("font-size")) > 40 && (e(this).attr("data-orig-font") || e(this).attr("data-orig-font", e(this).css("font-size")), e(this).css("font-size", "40px"))
            }) : n.heading_font.filter("[data-orig-font]").each(function() {
                e(this).css("font-size", e(this).attr("data-orig-font"))
            })
        }
    }, e(document).ready(function() {
        new c, e("#seocrawler-main-menu, #seocrawler-right-menu, #seocrawler-mobile-menu").each(function() {
            e(this).hasClass("seocrawler-overlay-menu") ? new a(e(this)) : e(this).hasClass("seocrawler-mm-menu-wrap") ? e(this).seocrawler_mobile_menu() : new i(e(this))
        }), e("#seocrawler-top-search, #seocrawler-mobile-top-search").each(function() {
            var t = e(this).siblings(".seocrawler-top-search-wrap");
            t.appendTo("body"), e(this).on('click',function() {
                t.fadeIn(200, function() {
                    e(this).addClass("seocrawler-active")
                })
            }), t.find(".seocrawler-top-search-close").on('click',function() {
                t.fadeOut(200, function() {
                    e(this).addClass("seocrawler-active")
                })
            }), t.find(".search-submit").on('click',function() {
                if (0 == t.find(".search-field").val().length) return !1
            })
        }), e("#seocrawler-main-menu-cart, #seocrawler-mobile-menu-cart").each(function() {
            e(this).hover(function() {
                e(this).addClass("seocrawler-active seocrawler-animating")
            }, function() {
                var t = e(this);
                t.removeClass("seocrawler-active"), setTimeout(function() {
                    t.removeClass("seocrawler-animating")
                }, 400)
            })
        }), e(".seocrawler-header-boxed-wrap, .seocrawler-header-background-transparent, .seocrawler-navigation-bar-wrap.seocrawler-style-transparent").each(function() {
            var t = e(this),
                n = e(".seocrawler-header-transparent-substitute");
            n.height(t.outerHeight()), e(window).on("load resize", function() {
                n.height(t.outerHeight())
            })
        }), e("body.error404, body.search-no-results").each(function() {
            var t = e(this).find("#seocrawler-full-no-header-wrap"),
                n = parseInt(e(this).children(".seocrawler-body-outer-wrapper").children(".seocrawler-body-wrapper").css("margin-bottom")),
                s = (e(window).height() - t.offset().top - t.outerHeight() - n) / 2;
            s > 0 && t.css({
                "padding-top": s,
                "padding-bottom": s
            }), e(window).on("load resize", function() {
                t.css({
                    "padding-top": 0,
                    "padding-bottom": 0
                }), (s = (e(window).height() - t.offset().top - t.outerHeight() - n) / 2) > 0 && t.css({
                    "padding-top": s,
                    "padding-bottom": s
                })
            })
        });
        var t = e("#seocrawler-footer-back-to-top-button");
        t.length && e(window).on("scroll", function() {
            e(window).scrollTop() > 300 ? t.addClass("seocrawler-scrolled") : t.removeClass("seocrawler-scrolled")
        }), e("body").children("#seocrawler-page-preload").each(function() {
            var t = e(this),
                n = parseInt(t.attr("data-animation-time"));
            e("a[href]").not('[href^="#"], [target="_blank"], .gdlr-core-js, .strip').on('click',function(s) {
                1 != s.which || e(this).hasClass("seocrawler-no-preload") || window.location.href != this.href && t.addClass("seocrawler-out").fadeIn(n)
            }), e(window).load(function() {
                t.fadeOut(n)
            })
        })
    }), e(window).bind("pageshow", function(t) {
        t.originalEvent.persisted && e("body").children("#seocrawler-page-preload").each(function() {
            e(this).fadeOut(400)
        })
    }), e(window).on("beforeunload", function() {
        e("body").children("#seocrawler-page-preload").each(function() {
            e(this).fadeOut(400)
        })
    }), e(window).load(function() {
        e("#seocrawler-fixed-footer").each(function() {
            var t = e(this),
                n = e('<div class="seocrawler-fixed-footer-placeholder" ></div>');
            n.insertBefore(t), n.height(t.outerHeight()), e("body").css("min-height", e(window).height() - parseInt(e("html").css("margin-top"))), e(window).resize(function() {
                n.height(t.outerHeight()), e("body").css("min-height", e(window).height() - parseInt(e("html").css("margin-top")))
            })
        }), new o(e("#seocrawler-header-side-nav")), new l, new r
    })
}(jQuery),
function(e) {
    function t() {
        e[n].glbl || (r = {
            $wndw: e(window),
            $docu: e(document),
            $html: e("html"),
            $body: e("body")
        }, i = {}, a = {}, o = {}, e.each([i, a, o], function(e, t) {
            t.add = function(e) {
                for (var n = 0, s = (e = e.split(" ")).length; s > n; n++) t[e[n]] = t.mm(e[n])
            }
        }), i.mm = function(e) {
            return "mm-" + e
        }, i.add("wrapper menu panels panel nopanel current highest opened subopened navbar hasnavbar title btn prev next listview nolistview inset vertical selected divider spacer hidden fullsubopen"), i.umm = function(e) {
            return "mm-" == e.slice(0, 3) && (e = e.slice(3)), e
        }, a.mm = function(e) {
            return "mm-" + e
        }, a.add("parent sub"), o.mm = function(e) {
            return e + ".mm"
        }, o.add("transitionend webkitTransitionEnd click scroll keydown mousedown mouseup touchstart touchmove touchend orientationchange"), e[n]._c = i, e[n]._d = a, e[n]._e = o, e[n].glbl = r)
    }
    var n = "mmenu",
        s = "5.6.1";
    if (!(e[n] && e[n].version > s)) {
        e[n] = function(e, t, n) {
            this.$menu = e, this._api = ["bind", "init", "update", "setSelected", "getInstance", "openPanel", "closePanel", "closeAllPanels"], this.opts = t, this.conf = n, this.vars = {}, this.cbck = {}, "function" == typeof this.___deprecated && this.___deprecated(), this._initMenu(), this._initAnchors();
            var s = this.$pnls.children();
            return this._initAddons(), this.init(s), "function" == typeof this.___debug && this.___debug(), this
        }, e[n].version = s, e[n].addons = {}, e[n].uniqueId = 0, e[n].defaults = {
            extensions: [],
            navbar: {
                add: !0,
                title: "Menu",
                titleLink: "panel"
            },
            onClick: {
                setSelected: !0
            },
            slidingSubmenus: !0
        }, e[n].configuration = {
            classNames: {
                divider: "Divider",
                inset: "Inset",
                panel: "Panel",
                selected: "Selected",
                spacer: "Spacer",
                vertical: "Vertical"
            },
            clone: !1,
            openingInterval: 25,
            panelNodetype: "ul, ol, div",
            transitionDuration: 400
        }, e[n].prototype = {
            init: function(e) {
                e = e.not("." + i.nopanel), e = this._initPanels(e), this.trigger("init", e), this.trigger("update")
            },
            update: function() {
                this.trigger("update")
            },
            setSelected: function(e) {
                this.$menu.find("." + i.listview).children().removeClass(i.selected), e.addClass(i.selected), this.trigger("setSelected", e)
            },
            openPanel: function(t) {
                var s = t.parent(),
                    a = this;
                if (s.hasClass(i.vertical)) {
                    var o = s.parents("." + i.subopened);
                    if (o.length) return void this.openPanel(o.first());
                    s.addClass(i.opened), this.trigger("openPanel", t), this.trigger("openingPanel", t), this.trigger("openedPanel", t)
                } else {
                    if (t.hasClass(i.current)) return;
                    var r = this.$pnls.children("." + i.panel),
                        l = r.filter("." + i.current);
                    r.removeClass(i.highest).removeClass(i.current).not(t).not(l).not("." + i.vertical).addClass(i.hidden), e[n].support.csstransitions || l.addClass(i.hidden), t.hasClass(i.opened) ? t.nextAll("." + i.opened).addClass(i.highest).removeClass(i.opened).removeClass(i.subopened) : (t.addClass(i.highest), l.addClass(i.subopened)), t.removeClass(i.hidden).addClass(i.current), a.trigger("openPanel", t), setTimeout(function() {
                        t.removeClass(i.subopened).addClass(i.opened), a.trigger("openingPanel", t), a.__transitionend(t, function() {
                            a.trigger("openedPanel", t)
                        }, a.conf.transitionDuration)
                    }, this.conf.openingInterval)
                }
            },
            closePanel: function(e) {
                var t = e.parent();
                t.hasClass(i.vertical) && (t.removeClass(i.opened), this.trigger("closePanel", e), this.trigger("closingPanel", e), this.trigger("closedPanel", e))
            },
            closeAllPanels: function() {
                this.$menu.find("." + i.listview).children().removeClass(i.selected).filter("." + i.vertical).removeClass(i.opened);
                var e = this.$pnls.children("." + i.panel).first();
                this.$pnls.children("." + i.panel).not(e).removeClass(i.subopened).removeClass(i.opened).removeClass(i.current).removeClass(i.highest).addClass(i.hidden), this.openPanel(e)
            },
            togglePanel: function(e) {
                var t = e.parent();
                t.hasClass(i.vertical) && this[t.hasClass(i.opened) ? "closePanel" : "openPanel"](e)
            },
            getInstance: function() {
                return this
            },
            bind: function(e, t) {
                this.cbck[e] = this.cbck[e] || [], this.cbck[e].push(t)
            },
            trigger: function() {
                var e = this,
                    t = Array.prototype.slice.call(arguments),
                    n = t.shift();
                if (this.cbck[n])
                    for (var s = 0, i = this.cbck[n].length; i > s; s++) this.cbck[n][s].apply(e, t)
            },
            _initMenu: function() {
                this.$menu.attr("id", this.$menu.attr("id") || this.__getUniqueId()), this.conf.clone && (this.$menu = this.$menu.clone(!0), this.$menu.add(this.$menu.find("[id]")).filter("[id]").each(function() {
                    e(this).attr("id", i.mm(e(this).attr("id")))
                })), this.$menu.contents().each(function() {
                    3 == e(this)[0].nodeType && e(this).remove()
                }), this.$pnls = e('<div class="' + i.panels + '" />').append(this.$menu.children(this.conf.panelNodetype)).prependTo(this.$menu), this.$menu.parent().addClass(i.wrapper);
                var t = [i.menu];
                this.opts.slidingSubmenus || t.push(i.vertical), this.opts.extensions = this.opts.extensions.length ? "mm-" + this.opts.extensions.join(" mm-") : "", this.opts.extensions && t.push(this.opts.extensions), this.$menu.addClass(t.join(" "))
            },
            _initPanels: function(t) {
                var n = this,
                    s = this.__findAddBack(t, "ul, ol");
                this.__refactorClass(s, this.conf.classNames.inset, "inset").addClass(i.nolistview + " " + i.nopanel), s.not("." + i.nolistview).addClass(i.listview);
                var o = this.__findAddBack(t, "." + i.listview).children();
                this.__refactorClass(o, this.conf.classNames.selected, "selected"), this.__refactorClass(o, this.conf.classNames.divider, "divider"), this.__refactorClass(o, this.conf.classNames.spacer, "spacer"), this.__refactorClass(this.__findAddBack(t, "." + this.conf.classNames.panel), this.conf.classNames.panel, "panel");
                var r = e(),
                    l = t.add(t.find("." + i.panel)).add(this.__findAddBack(t, "." + i.listview).children().children(this.conf.panelNodetype)).not("." + i.nopanel);
                this.__refactorClass(l, this.conf.classNames.vertical, "vertical"), this.opts.slidingSubmenus || l.addClass(i.vertical), l.each(function() {
                    var t = e(this),
                        s = t;
                    t.is("ul, ol") ? (t.wrap('<div class="' + i.panel + '" />'), s = t.parent()) : s.addClass(i.panel);
                    var a = t.attr("id");
                    t.removeAttr("id"), s.attr("id", a || n.__getUniqueId()), t.hasClass(i.vertical) && (t.removeClass(n.conf.classNames.vertical), s.add(s.parent()).addClass(i.vertical)), r = r.add(s)
                });
                var c = e("." + i.panel, this.$menu);
                r.each(function(t) {
                    var s, o, r = e(this),
                        l = r.parent(),
                        c = l.children("a, span").first();
                    if (l.is("." + i.panels) || (l.data(a.sub, r), r.data(a.parent, l)), l.children("." + i.next).length || l.parent().is("." + i.listview) && (s = r.attr("id"), o = e('<a class="' + i.next + '" href="#' + s + '" data-target="#' + s + '" />').insertBefore(c), c.is("span") && o.addClass(i.fullsubopen)), !r.children("." + i.navbar).length && !l.hasClass(i.vertical)) {
                        l.parent().is("." + i.listview) ? l = l.closest("." + i.panel) : (c = l.closest("." + i.panel).find('a[href="#' + r.attr("id") + '"]').first(), l = c.closest("." + i.panel));
                        var d = e('<div class="' + i.navbar + '" />');
                        if (l.length) {
                            switch (s = l.attr("id"), n.opts.navbar.titleLink) {
                                case "anchor":
                                    _url = c.attr("href");
                                    break;
                                case "panel":
                                case "parent":
                                    _url = "#" + s;
                                    break;
                                default:
                                    _url = !1
                            }
                            d.append('<a class="' + i.btn + " " + i.prev + '" href="#' + s + '" data-target="#' + s + '" />').append(e('<a class="' + i.title + '"' + (_url ? ' href="' + _url + '"' : "") + " />").text(c.text())).prependTo(r), n.opts.navbar.add && r.addClass(i.hasnavbar)
                        } else n.opts.navbar.title && (d.append('<a class="' + i.title + '">' + n.opts.navbar.title + "</a>").prependTo(r), n.opts.navbar.add && r.addClass(i.hasnavbar))
                    }
                });
                var d = this.__findAddBack(t, "." + i.listview).children("." + i.selected).removeClass(i.selected).last().addClass(i.selected);
                d.add(d.parentsUntil("." + i.menu, "li")).filter("." + i.vertical).addClass(i.opened).end().each(function() {
                    e(this).parentsUntil("." + i.menu, "." + i.panel).not("." + i.vertical).first().addClass(i.opened).parentsUntil("." + i.menu, "." + i.panel).not("." + i.vertical).first().addClass(i.opened).addClass(i.subopened)
                }), d.children("." + i.panel).not("." + i.vertical).addClass(i.opened).parentsUntil("." + i.menu, "." + i.panel).not("." + i.vertical).first().addClass(i.opened).addClass(i.subopened);
                var h = c.filter("." + i.opened);
                return h.length || (h = r.first()), h.addClass(i.opened).last().addClass(i.current), r.not("." + i.vertical).not(h.last()).addClass(i.hidden).end().filter(function() {
                    return !e(this).parent().hasClass(i.panels)
                }).appendTo(this.$pnls), r
            },
            _initAnchors: function() {
                var t = this;
                r.$body.on(o.click + "-oncanvas", "a[href]", function(s) {
                    var a = e(this),
                        o = !1,
                        r = t.$menu.find(a).length;
                    for (var l in e[n].addons)
                        if (e[n].addons[l].clickAnchor.call(t, a, r)) {
                            o = !0;
                            break
                        } var c = a.attr("href");
                    if (!o && r && c.length > 1 && "#" == c.slice(0, 1)) try {
                        var d = e(c, t.$menu);
                        d.is("." + i.panel) && (o = !0, t[a.parent().hasClass(i.vertical) ? "togglePanel" : "openPanel"](d))
                    } catch (e) {}
                    if (o && s.preventDefault(), !o && r && a.is("." + i.listview + " > li > a") && !a.is('[rel="external"]') && !a.is('[target="_blank"]')) {
                        t.__valueOrFn(t.opts.onClick.setSelected, a) && t.setSelected(e(s.target).parent());
                        var h = t.__valueOrFn(t.opts.onClick.preventDefault, a, "#" == c.slice(0, 1));
                        h && s.preventDefault(), t.__valueOrFn(t.opts.onClick.close, a, h) && t.close()
                    }
                })
            },
            _initAddons: function() {
                var t;
                for (t in e[n].addons) e[n].addons[t].add.call(this), e[n].addons[t].add = function() {};
                for (t in e[n].addons) e[n].addons[t].setup.call(this)
            },
            _getOriginalMenuId: function() {
                var e = this.$menu.attr("id");
                return e && e.length && this.conf.clone && (e = i.umm(e)), e
            },
            __api: function() {
                var t = this,
                    n = {};
                return e.each(this._api, function(e) {
                    var s = this;
                    n[s] = function() {
                        var e = t[s].apply(t, arguments);
                        return void 0 === e ? n : e
                    }
                }), n
            },
            __valueOrFn: function(e, t, n) {
                return "function" == typeof e ? e.call(t[0]) : void 0 === e && void 0 !== n ? n : e
            },
            __refactorClass: function(e, t, n) {
                return e.filter("." + t).removeClass(t).addClass(i[n])
            },
            __findAddBack: function(e, t) {
                return e.find(t).add(e.filter(t))
            },
            __filterListItems: function(e) {
                return e.not("." + i.divider).not("." + i.hidden)
            },
            __transitionend: function(e, t, n) {
                var s = !1,
                    i = function() {
                        s || t.call(e[0]), s = !0
                    };
                e.one(o.transitionend, i), e.one(o.webkitTransitionEnd, i), setTimeout(i, 1.1 * n)
            },
            __getUniqueId: function() {
                return i.mm(e[n].uniqueId++)
            }
        }, e.fn[n] = function(s, i) {
            return t(), s = e.extend(!0, {}, e[n].defaults, s), i = e.extend(!0, {}, e[n].configuration, i), this.each(function() {
                var t = e(this);
                if (!t.data(n)) {
                    var a = new e[n](t, s, i);
                    a.$menu.data(n, a.__api())
                }
            })
        }, e[n].support = {
            touch: "ontouchstart" in window || navigator.msMaxTouchPoints || !1,
            csstransitions: function() {
                if ("undefined" != typeof Modernizr && void 0 !== Modernizr.csstransitions) return Modernizr.csstransitions;
                var e = (document.body || document.documentElement).style,
                    t = "transition";
                if ("string" == typeof e[t]) return !0;
                var n = ["Moz", "webkit", "Webkit", "Khtml", "O", "ms"];
                t = t.charAt(0).toUpperCase() + t.substr(1);
                for (var s = 0; s < n.length; s++)
                    if ("string" == typeof e[n[s] + t]) return !0;
                return !1
            }()
        };
        var i, a, o, r
    }
}(jQuery),
function(e) {
    var t = "mmenu",
        n = "offCanvas";
    e[t].addons[n] = {
        setup: function() {
            if (this.opts[n]) {
                var i = this.opts[n],
                    a = this.conf[n];
                o = e[t].glbl, this._api = e.merge(this._api, ["open", "close", "setPage"]), ("top" == i.position || "bottom" == i.position) && (i.zposition = "front"), "string" != typeof a.pageSelector && (a.pageSelector = "> " + a.pageNodetype), o.$allMenus = (o.$allMenus || e()).add(this.$menu), this.vars.opened = !1;
                var r = [s.offcanvas];
                "left" != i.position && r.push(s.mm(i.position)), "back" != i.zposition && r.push(s.mm(i.zposition)), this.$menu.addClass(r.join(" ")).parent().removeClass(s.wrapper), this.setPage(o.$page), this._initBlocker(), this["_initWindow_" + n](), this.$menu[a.menuInjectMethod + "To"](a.menuWrapperSelector);
                var l = window.location.hash;
                if (l) {
                    var c = this._getOriginalMenuId();
                    c && c == l.slice(1) && this.open()
                }
            }
        },
        add: function() {
            s = e[t]._c, i = e[t]._d, a = e[t]._e, s.add("offcanvas slideout blocking modal background opening blocker page"), i.add("style"), a.add("resize")
        },
        clickAnchor: function(e, t) {
            if (!this.opts[n]) return !1;
            var s = this._getOriginalMenuId();
            return s && e.is('[href="#' + s + '"]') ? (this.open(), !0) : o.$page ? !(!(s = o.$page.first().attr("id")) || !e.is('[href="#' + s + '"]')) && (this.close(), !0) : void 0
        }
    }, e[t].defaults[n] = {
        position: "left",
        zposition: "back",
        blockUI: !0,
        moveBackground: !0
    }, e[t].configuration[n] = {
        pageNodetype: "div",
        pageSelector: null,
        noPageSelector: [],
        wrapPageIfNeeded: !0,
        menuWrapperSelector: "body",
        menuInjectMethod: "prepend"
    }, e[t].prototype.open = function() {
        if (!this.vars.opened) {
            var e = this;
            this._openSetup(), setTimeout(function() {
                e._openFinish()
            }, this.conf.openingInterval), this.trigger("open")
        }
    }, e[t].prototype._openSetup = function() {
        var t = this,
            r = this.opts[n];
        this.closeAllOthers(), o.$page.each(function() {
            e(this).data(i.style, e(this).attr("style") || "")
        }), o.$wndw.trigger(a.resize + "-" + n, [!0]);
        var l = [s.opened];
        r.blockUI && l.push(s.blocking), "modal" == r.blockUI && l.push(s.modal), r.moveBackground && l.push(s.background), "left" != r.position && l.push(s.mm(this.opts[n].position)), "back" != r.zposition && l.push(s.mm(this.opts[n].zposition)), this.opts.extensions && l.push(this.opts.extensions), o.$html.addClass(l.join(" ")), setTimeout(function() {
            t.vars.opened = !0
        }, this.conf.openingInterval), this.$menu.addClass(s.current + " " + s.opened)
    }, e[t].prototype._openFinish = function() {
        var e = this;
        this.__transitionend(o.$page.first(), function() {
            e.trigger("opened")
        }, this.conf.transitionDuration), o.$html.addClass(s.opening), this.trigger("opening")
    }, e[t].prototype.close = function() {
        if (this.vars.opened) {
            var t = this;
            this.__transitionend(o.$page.first(), function() {
                t.$menu.removeClass(s.current).removeClass(s.opened), o.$html.removeClass(s.opened).removeClass(s.blocking).removeClass(s.modal).removeClass(s.background).removeClass(s.mm(t.opts[n].position)).removeClass(s.mm(t.opts[n].zposition)), t.opts.extensions && o.$html.removeClass(t.opts.extensions), o.$page.each(function() {
                    e(this).attr("style", e(this).data(i.style))
                }), t.vars.opened = !1, t.trigger("closed")
            }, this.conf.transitionDuration), o.$html.removeClass(s.opening), this.trigger("close"), this.trigger("closing")
        }
    }, e[t].prototype.closeAllOthers = function() {
        o.$allMenus.not(this.$menu).each(function() {
            var n = e(this).data(t);
            n && n.close && n.close()
        })
    }, e[t].prototype.setPage = function(t) {
        var i = this,
            a = this.conf[n];
        t && t.length || (t = o.$body.find(a.pageSelector), a.noPageSelector.length && (t = t.not(a.noPageSelector.join(", "))), t.length > 1 && a.wrapPageIfNeeded && (t = t.wrapAll("<" + this.conf[n].pageNodetype + " />").parent())), t.each(function() {
            e(this).attr("id", e(this).attr("id") || i.__getUniqueId())
        }), t.addClass(s.page + " " + s.slideout), o.$page = t, this.trigger("setPage", t)
    }, e[t].prototype["_initWindow_" + n] = function() {
        o.$wndw.off(a.keydown + "-" + n).on(a.keydown + "-" + n, function(e) {
            return o.$html.hasClass(s.opened) && 9 == e.keyCode ? (e.preventDefault(), !1) : void 0
        });
        var e = 0;
        o.$wndw.off(a.resize + "-" + n).on(a.resize + "-" + n, function(t, n) {
            if (1 == o.$page.length && (n || o.$html.hasClass(s.opened))) {
                var i = o.$wndw.height();
                (n || i != e) && (e = i, o.$page.css("minHeight", i))
            }
        })
    }, e[t].prototype._initBlocker = function() {
        var t = this;
        this.opts[n].blockUI && (o.$blck || (o.$blck = e('<div id="' + s.blocker + '" class="' + s.slideout + '" />')), o.$blck.appendTo(o.$body).off(a.touchstart + "-" + n + " " + a.touchmove + "-" + n).on(a.touchstart + "-" + n + " " + a.touchmove + "-" + n, function(e) {
            e.preventDefault(), e.stopPropagation(), o.$blck.trigger(a.mousedown + "-" + n)
        }).off(a.mousedown + "-" + n).on(a.mousedown + "-" + n, function(e) {
            e.preventDefault(), o.$html.hasClass(s.modal) || (t.closeAllOthers(), t.close())
        }))
    };
    var s, i, a, o
}(jQuery),
function(e) {
    var t = "mmenu",
        n = "scrollBugFix";
    e[t].addons[n] = {
        setup: function() {
            var i = this,
                r = this.opts[n];
            if (this.conf[n], o = e[t].glbl, e[t].support.touch && this.opts.offCanvas && this.opts.offCanvas.modal && ("boolean" == typeof r && (r = {
                    fix: r
                }), "object" != typeof r && (r = {}), (r = this.opts[n] = e.extend(!0, {}, e[t].defaults[n], r)).fix)) {
                var l = this.$menu.attr("id"),
                    c = !1;
                this.bind("opening", function() {
                    this.$pnls.children("." + s.current).scrollTop(0)
                }), o.$docu.on(a.touchmove, function(e) {
                    i.vars.opened && e.preventDefault()
                }), o.$body.on(a.touchstart, "#" + l + "> ." + s.panels + "> ." + s.current, function(e) {
                    i.vars.opened && (c || (c = !0, 0 === e.currentTarget.scrollTop ? e.currentTarget.scrollTop = 1 : e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight && (e.currentTarget.scrollTop -= 1), c = !1))
                }).on(a.touchmove, "#" + l + "> ." + s.panels + "> ." + s.current, function(t) {
                    i.vars.opened && e(this)[0].scrollHeight > e(this).innerHeight() && t.stopPropagation()
                }), o.$wndw.on(a.orientationchange, function() {
                    i.$pnls.children("." + s.current).scrollTop(0).css({
                        "-webkit-overflow-scrolling": "auto"
                    }).css({
                        "-webkit-overflow-scrolling": "touch"
                    })
                })
            }
        },
        add: function() {
            s = e[t]._c, i = e[t]._d, a = e[t]._e
        },
        clickAnchor: function(e, t) {}
    }, e[t].defaults[n] = {
        fix: !0
    };
    var s, i, a, o
}(jQuery),
function(e, t) {
    "use strict";
    var n = function() {
        var n = {
                bcClass: "sf-breadcrumb",
                menuClass: "sf-js-enabled",
                anchorClass: "sf-with-ul",
                menuArrowClass: "sf-arrows"
            },
            s = function() {
                var t = /^(?![\w\W]*Windows Phone)[\w\W]*(iPhone|iPad|iPod)/i.test(navigator.userAgent);
                return t && e("html").css("cursor", "pointer").on("click", e.noop), t
            }(),
            i = function() {
                var e = document.documentElement.style;
                return "behavior" in e && "fill" in e && /iemobile/i.test(navigator.userAgent)
            }(),
            a = function() {
                return !!t.PointerEvent
            }(),
            o = function(e, t) {
                var s = n.menuClass;
                t.cssArrows && (s += " " + n.menuArrowClass), e.toggleClass(s)
            },
            r = function(t, s) {
                return t.find("li." + s.pathClass).slice(0, s.pathLevels).addClass(s.hoverClass + " " + n.bcClass).filter(function() {
                    return e(this).children(s.popUpSelector).hide().show().length
                }).removeClass(s.pathClass)
            },
            l = function(e) {
                e.children("a").toggleClass(n.anchorClass)
            },
            c = function(e) {
                var t = e.css("ms-touch-action"),
                    n = e.css("touch-action");
                n = "pan-y" === (n = n || t) ? "auto" : "pan-y", e.css({
                    "ms-touch-action": n,
                    "touch-action": n
                })
            },
            d = function(t, n) {
                var o = "li:has(" + n.popUpSelector + ")";
                e.fn.hoverIntent && !n.disableHI ? t.hoverIntent(u, p, o) : t.on("mouseenter.superfish", o, u).on("mouseleave.superfish", o, p);
                var r = "MSPointerDown.superfish";
                a && (r = "pointerdown.superfish"), s || (r += " touchend.superfish"), i && (r += " mousedown.superfish"), t.on("focusin.superfish", "li", u).on("focusout.superfish", "li", p).on(r, "a", n, h)
            },
            h = function(t) {
                var n = e(this),
                    s = v(n),
                    i = n.siblings(t.data.popUpSelector);
                return !1 === s.onHandleTouch.call(i) ? this : void(i.length > 0 && i.is(":hidden") && (n.one("click.superfish", !1), "MSPointerDown" === t.type || "pointerdown" === t.type ? n.trigger("focus") : e.proxy(u, n.parent("li"))()))
            },
            u = function() {
                var t = e(this),
                    n = v(t);
                clearTimeout(n.sfTimer), t.siblings().superfish("hide").end().superfish("show")
            },
            p = function() {
                var t = e(this),
                    n = v(t);
                s ? e.proxy(f, t, n)() : (clearTimeout(n.sfTimer), n.sfTimer = setTimeout(e.proxy(f, t, n), n.delay))
            },
            f = function(t) {
                t.retainPath = e.inArray(this[0], t.$path) > -1, this.superfish("hide"), this.parents("." + t.hoverClass).length || (t.onIdle.call(m(this)), t.$path.length && e.proxy(u, t.$path)())
            },
            m = function(e) {
                return e.closest("." + n.menuClass)
            },
            v = function(e) {
                return m(e).data("sf-options")
            };
        return {
            hide: function(t) {
                if (this.length) {
                    var n = this,
                        s = v(n);
                    if (!s) return this;
                    var i = !0 === s.retainPath ? s.$path : "",
                        a = n.find("li." + s.hoverClass).add(this).not(i).removeClass(s.hoverClass).children(s.popUpSelector),
                        o = s.speedOut;
                    if (t && (a.show(), o = 0), s.retainPath = !1, !1 === s.onBeforeHide.call(a)) return this;
                    a.stop(!0, !0).animate(s.animationOut, o, "easeOutQuad", function() {
                        var t = e(this);
                        s.onHide.call(t)
                    })
                }
                return this
            },
            show: function() {
                var e = v(this);
                if (!e) return this;
                var t = this.addClass(e.hoverClass).children(e.popUpSelector);
                return !1 === e.onBeforeShow.call(t) ? this : (t.stop(!0, !0).animate(e.animation, e.speed, "easeOutQuad", function() {
                    e.onShow.call(t)
                }), this)
            },
            destroy: function() {
                return this.each(function() {
                    var t, s = e(this),
                        i = s.data("sf-options");
                    return !!i && (t = s.find(i.popUpSelector).parent("li"), clearTimeout(i.sfTimer), o(s, i), l(t), c(s), s.off(".superfish").off(".hoverIntent"), t.children(i.popUpSelector).attr("style", function(e, t) {
                        return t.replace(/display[^;]+;?/g, "")
                    }), i.$path.removeClass(i.hoverClass + " " + n.bcClass).addClass(i.pathClass), s.find("." + i.hoverClass).removeClass(i.hoverClass), i.onDestroy.call(s), void s.removeData("sf-options"))
                })
            },
            init: function(t) {
                return this.each(function() {
                    var s = e(this);
                    if (s.data("sf-options")) return !1;
                    var i = e.extend({}, e.fn.superfish.defaults, t),
                        a = s.find(i.popUpSelector).parent("li");
                    i.$path = r(s, i), s.data("sf-options", i), o(s, i), l(a), c(s), d(s, i), a.not("." + n.bcClass).superfish("hide", !0), i.onInit.call(this)
                })
            }
        }
    }();
    e.fn.superfish = function(t, s) {
        return n[t] ? n[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? e.error("Method " + t + " does not exist on jQuery.fn.superfish") : n.init.apply(this, arguments)
    }, e.fn.superfish.defaults = {
        popUpSelector: "ul,.sf-mega",
        hoverClass: "sfHover",
        pathClass: "overrideThisToUse",
        pathLevels: 1,
        delay: 800,
        animation: {
            opacity: "show"
        },
        animationOut: {
            opacity: "hide"
        },
        speed: "normal",
        speedOut: "fast",
        cssArrows: !0,
        disableHI: !1,
        onInit: e.noop,
        onBeforeShow: e.noop,
        onShow: e.noop,
        onBeforeHide: e.noop,
        onHide: e.noop,
        onIdle: e.noop,
        onDestroy: e.noop,
        onHandleTouch: e.noop
    }
}(jQuery, window);