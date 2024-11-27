if (document.querySelector(".preloader")) {
	window.addEventListener("load", (event) => {
		document.body.classList.add('loaded');
		setTimeout(() => {
			document.querySelector(".preloader").remove()
		}, 500);
	});
}
const header = document.querySelector(".header")
const mobMenu = document.querySelector('.mob-menu');
const iconMenu = document.querySelector('.icon-menu');
const modal = document.querySelectorAll(".modal")
const modOpenBtn = document.querySelectorAll(".mod-open-btn")
const modCloseBtn = document.querySelectorAll(".mod-close-btn")
const successModal = document.querySelector(".success-mod")
const errorModal = document.querySelector(".error-mod")
const dropdown = document.querySelectorAll(".dropdown")
let tablet = 1250.98
let mob = 767.98
let mm = gsap.matchMedia()
let animSpd = 300
//get path to sprite id
function sprite(id) {
	return '<svg><use xlink:href="img/icons/sprite.svg#' + id + '"></use></svg>'
}
//scroll pos
function scrollPos() {
	return window.pageYOffset || document.documentElement.scrollTop
}
//enable scroll
function enableScroll() {
	if (document.querySelectorAll(".fixed-block")) {
		document.querySelectorAll(".fixed-block").forEach(block => block.style.paddingRight = '0px')
	}
	document.body.style.paddingRight = '0px'
	document.body.classList.remove("no-scroll")
}
//disable scroll
function disableScroll() {
	let paddingValue = window.innerWidth > 350 ? window.innerWidth - document.documentElement.clientWidth + 'px' : 0
	if (document.querySelectorAll(".fixed-block")) {
		document.querySelectorAll(".fixed-block").forEach(block => block.style.paddingRight = paddingValue)
	}
	document.body.style.paddingRight = paddingValue
	document.body.classList.add("no-scroll");
}
//smoothdrop
function smoothDrop(header, body, dur = false) {
	let animDur = dur ? dur : 500
	body.style.overflow = 'hidden';
	body.style.transition = `height ${animDur}ms ease`;
	body.style['-webkit-transition'] = `height ${animDur}ms ease`;
	if (!header.classList.contains("active")) {
		header.classList.add("animated")
		body.style.display = 'block';
		let height = body.clientHeight + 'px';
		body.style.height = '0px';
		setTimeout(function () {
			body.style.height = height;
			setTimeout(() => {
				body.style.height = null
				header.classList.add("active")
			}, animDur);
		}, 0);
	} else {
		header.classList.remove("animated")
		let height = body.clientHeight + 'px';
		body.style.height = height
		setTimeout(function () {
			body.style.height = "0"
			setTimeout(() => {
				body.style.display = 'none';
				body.style.height = null
				header.classList.remove("active")
			}, animDur);
		}, 0);
	}
}
//tabSwitch
function tabSwitch(nav, block) {
	nav.forEach((item, idx) => {
		item.addEventListener("click", () => {
			nav.forEach(el => {
				el.classList.remove("active")
			})
			block.forEach(el => {
				el.classList.remove("active")
				if (el.querySelector(".split-list")) {
					el.querySelector(".split-list").classList.remove("animated")
				}
			})
			item.classList.add("active")
			block[idx].classList.add("active")
			item.style.opacity = "0"
			block[idx].style.opacity = "0"
			setTimeout(() => {
				item.style.opacity = "1"
				block[idx].style.opacity = "1"
				if (block[idx].querySelector(".split-list")) {
					block[idx].querySelector(".split-list").classList.add("animated")
				}
			}, 0);
		})
	});
}
// custom scroll FF
const customScroll = document.querySelectorAll(".custom-scroll")
let isFirefox = typeof InstallTrigger !== 'undefined';
if (isFirefox) {
	document.documentElement.style.scrollbarColor = "#8120A5 #FFFFFF"
}
if (isFirefox && customScroll) {
	customScroll.forEach(item => { item.style.scrollbarColor = "#8120A5 transparent" })
}
//anchor
if (document.querySelector(".js-anchor")) {
	document.querySelectorAll(".js-anchor").forEach(item => {
		item.addEventListener("click", e => {
			e.preventDefault()
			let idx = item.getAttribute("href").indexOf("#")
			const href = item.getAttribute("href").substring(idx)
			let dest = document.querySelector(href)
			let diff = 0
			destPos = dest.getBoundingClientRect().top < 0 ? dest.getBoundingClientRect().top - header.clientHeight - 10 : dest.getBoundingClientRect().top - 10
			if (iconMenu.classList.contains("active")) {
				iconMenu.click()
				setTimeout(() => {
					window.scrollTo({ top: scrollPos() - diff + destPos, behavior: 'smooth' })
				}, 300);
			} else {
				window.scrollTo({ top: scrollPos() - diff + destPos, behavior: 'smooth' })
			}

		})
	})
}
//fixed header
let lastScroll = scrollPos();
window.addEventListener("scroll", () => {
	if (!iconMenu.classList.contains("active")) {
		if (scrollPos() > 1) {
			header.classList.add("scroll")
			if ((scrollPos() > lastScroll && scrollPos() > 150 && !header.classList.contains("unshow"))) {
				header.classList.add("unshow")
			} else if (scrollPos() < lastScroll && header.classList.contains("unshow")) {
				header.classList.remove("unshow")
			}
		} else {
			header.classList.remove("scroll")
			header.classList.remove("unshow")
		}
	}
	lastScroll = scrollPos()
})
//switch active tab/block
const switchBlock = document.querySelectorAll(".switch-block")
if (switchBlock) {
	switchBlock.forEach(item => {
		tabSwitch(item.querySelectorAll("[data-nav]"), item.querySelectorAll("[data-block]"))
	})
}
//open modal
function openModal(modal) {
	let activeModal = document.querySelector(".modal.open")
	if (!activeModal && !iconMenu.classList.contains("active")) {
		disableScroll()
	}
	if (activeModal) {
		activeModal.classList.remove("open")
	}
	modal.classList.add("open")
}
//close modal
function closeModal(modal) {
	modal.classList.remove("open")
	setTimeout(() => {
		if (!iconMenu.classList.contains("active")) {
			enableScroll()
		}
	}, animSpd);
}
// modal click outside
if (modal) {
	modal.forEach((mod) => {
		mod.addEventListener("click", (e) => {
			if (!mod.querySelector(".modal__content").contains(e.target) ||
				mod.querySelector(".btn-close").contains(e.target) ||
				(mod.querySelector(".modal__close") && mod.querySelector(".modal__close").contains(e.target))) {
				closeModal(mod);
			}
		});
	});
}
// modal button on click
if (modOpenBtn) {
	modOpenBtn.forEach(btn => {
		btn.addEventListener("click", e => {
			e.preventDefault()
			let href = btn.getAttribute("data-modal")
			openModal(document.getElementById(href))
		})
	})
}
// modal close button on click
if (modCloseBtn) {
	modCloseBtn.forEach(btn => {
		btn.addEventListener("click", e => {
			e.preventDefault()
			let href = btn.getAttribute("data-modal")
			closeModal(document.getElementById(href))
		})
	})
}
//open dropdown
function openDropdown(item) {
	item.classList.add("open");
	item.setAttribute("aria-expanded", true);
	item.querySelectorAll(".dropdown__options input").forEach(inp => {
		inp.addEventListener("change", (e) => {
			setActiveOption(item)
		});
	});
	document.addEventListener("click", function clickOutside(e) {
		if (!item.contains(e.target)) {
			closeDropdown(item)
			document.removeEventListener('click', clickOutside);
		}
	});
}
// set active option
function setActiveOption(item) {
	item.querySelector(".dropdown__header").classList.add("checked")
	if (item.classList.contains("radio-select")) {
		let activeInpTxt = item.querySelector("input:checked").nextElementSibling.innerHTML
		item.querySelector(".dropdown__header span").innerHTML = activeInpTxt
		closeDropdown(item)
	}
}
//close dropdonw
function closeDropdown(item) {
	item.classList.remove("open");
	item.setAttribute("aria-expanded", false);
}
//dropdown
if (dropdown) {
	dropdown.forEach(item => {
		item.querySelector(".dropdown__header").addEventListener("click", () => {
			item.classList.contains("open") ? closeDropdown(item) : openDropdown(item)
		})
	})
}
//setSuccessTxt
function setSuccessTxt(title = false, txt = false, btnTxt = false) {
	successModal.querySelector("h3").textContent = title ? title : "Заявка успешно отправлена"
	successModal.querySelector(".modal__close span").textContent = btnTxt ? btnTxt : "Ок"
	if (txt) {
		successModal.querySelector("p").textContent = txt
	}
}
//setErrorTxt
function setErrorTxt(title = false, txt = false, btnTxt = false) {
	errorModal.querySelector("h3").textContent = title ? title : "ошибка"
	errorModal.querySelector(".modal__close span").textContent = btnTxt ? btnTxt : "Попробовать снова"
	if (txt) {
		errorModal.querySelector("p").textContent = txt
	}
}
// openSuccessMod
function openSuccessMod(title = false, txt = false, btnTxt = false) {
	setSuccessTxt(title, txt, btnTxt)
	openModal(successModal)
}
// openErrorMod
function openErrorMod(title = false, txt = false, btnTxt = false) {
	setErrorTxt(title, txt, btnTxt)
	openModal(errorModal)
}
// formSuccess
function formSuccess(form) {
	form.querySelectorAll(".item-form").forEach(item => item.classList.remove("error"))
	if (form.querySelector('[data-error]')) {
		form.querySelectorAll("[data-error]").forEach(item => item.textContent = '')
	}
	form.querySelectorAll("input").forEach(inp => {
		if (!["hidden", "checkbox", "radio"].includes(inp.type)) {
			inp.value = ""
		}
		if (["checkbox", "radio"].includes(inp.type) && !inp.classList.contains("required")) {
			inp.checked = false
		}
	})
	if (form.querySelector("textarea")) {
		form.querySelector("textarea").value = ""
		form.querySelector("textarea").style.height = null
	}
	if (form.querySelector(".file-form__items")) {
		form.querySelector(".file-form__items").innerHTML = ""
	}
}
//mask input
const inp = document.querySelectorAll('input[type=tel]')
if (inp) {
	inp.forEach(item => {
		Inputmask({ "mask": "+7-999-999-9999" }).mask(item);
	})
}
//file-form
function addFile(files, item) {
	let fileTypes = item.getAttribute("file-types")
	for (let i = 0; i < files.length; i++) {
		let file = files[i]
		if (file.size > 10 * 1024 * 1024) {
			item.querySelector("input").value = ""
			item.classList.add("error")
			item.querySelectorAll(".file-form__item").forEach((el => el.remove()));
			item.querySelector("[data-error]").textContent = "Файл должен быть менее 10 МБ"
			return
		} else if (!file.type || !fileTypes.includes(file.type)) {
			item.querySelector("input").value = ""
			item.classList.add("error")
			item.querySelectorAll(".file-form__item").forEach((el => el.remove()));
			item.querySelector("[data-error]").textContent = 'Ошибка. Загрузите файлы в одном из указанных форматов'
			return
		} else {
			item.classList.remove("error")
			item.classList.add("checked")
			item.querySelector("[data-error]").textContent = ""
			let reader = new FileReader()
			reader.readAsDataURL(file);
			reader.onload = () => {
				item.querySelector(".file-form__items").insertAdjacentHTML("afterbegin", `<div class="file-form__item">         
            <div class="file-form__name">${file.name}</div> 
			<div class="file-form__del"></div>        
         </div>
        `)
			}
			reader.onerror = () => {
				console.log(reader.error);
			}
		}
	}
}
if (document.querySelector(".file-form")) {
	document.querySelectorAll(".file-form").forEach(item => {
		item.querySelector("input").addEventListener("change", e => {
			item.querySelectorAll(".file-form__item").forEach((el => el.remove()));
			let files = e.target.files;
			addFile(files, item)
		})
		//delete file
		item.addEventListener("click", e => {
			item.querySelectorAll(".file-form__del").forEach((del, idx) => {
				if (del.contains(e.target)) {
					const dt = new DataTransfer()
					const input = item.querySelector("input")
					const { files } = input
					for (let i = 0; i < files.length; i++) {
						let file = files[i]
						if (i !== idx) {
							dt.items.add(file)
						}
					}
					input.files = dt.files
					setTimeout(() => {
						del.parentNode.remove()
						item.classList.remove("checked")
					}, 0);
				}
			})
		})
		item.querySelector("label").addEventListener("dragenter", e => {
			e.preventDefault();
		})
		item.querySelector("label").addEventListener("dragover", e => {
			e.preventDefault();
		})
		item.querySelector("label").addEventListener("dragleave", e => {
			e.preventDefault();
		})
		item.querySelector("label").addEventListener("drop", function (e) {
			e.preventDefault();
			const dt = new DataTransfer()
			dt.items.add(e.dataTransfer.files[0])
			let files = Array.from(dt.files)
			item.querySelector("input").files = dt.files
			item.querySelectorAll(".file-form__item").forEach((el => el.remove()));
			addFile(files, item)
		});
	})
}
//menu
iconMenu.addEventListener("click", () => {
	if (iconMenu.classList.contains("active")) {
		enableScroll()
		iconMenu.classList.remove("active")
		iconMenu.setAttribute("aria-label", "Открыть меню")
		mobMenu.classList.remove("show")
	} else {
		disableScroll()
		iconMenu.classList.add("active")
		iconMenu.setAttribute("aria-label", "Закрыть меню")
		mobMenu.classList.add("show")
	}
})
window.addEventListener("resize", () => {
	if (iconMenu.classList.contains("active") && window.innerWidth > tablet) {
		iconMenu.click()
	}
})
//show/unshow fixed-sec
const section = document.querySelectorAll("main>section")
const fixedSec = document.querySelector(".fixed-sec")
const pageWrap = document.querySelector(".wrap")
function showFixedSec() {
	pageWrap.style.paddingBottom = fixedSec.clientHeight + "px"
	if (section[1].getBoundingClientRect().top < 0) {
		fixedSec.classList.add("show")
	} else {
		fixedSec.classList.remove("show")
	}
}
if (section && section[1]) {
	showFixedSec()
	window.addEventListener("scroll", showFixedSec)
}
const advantSec = document.querySelector(".advant-sec")
const stickyParent = document.querySelector(".advant-sec__sticky")
const stickyItem = document.querySelector(".advant-sec .sec-title")
const scrollItems = document.querySelector(".advant-sec__scroll")
if (advantSec) {
	function fixedItem() {
		stickyParent.style.position = "relative"
		stickyItem.style.maxWidth = stickyParent.clientWidth + "px"
		if (scrollItems.scrollHeight > stickyItem.clientHeight) {
			window.addEventListener("scroll", () => {
				let itemTitleHeight = stickyItem.clientHeight
				let scrollItemsTop = scrollPos() + scrollItems.getBoundingClientRect().top
				let scrollItemsBottom = scrollItemsTop + scrollItems.offsetHeight - itemTitleHeight
				if (scrollPos() > scrollItemsTop && scrollPos() < scrollItemsBottom) {
					stickyItem.style.position = "fixed"
					stickyItem.style.top = "0"
					stickyItem.style.bottom = "auto"
					header.classList.add("unshow")
				} else if (scrollPos() < scrollItemsTop) {
					stickyItem.style.position = "absolute"
					stickyItem.style.top = "0"
					stickyItem.style.bottom = "auto"
				} else if (scrollPos() > scrollItemsBottom) {
					stickyItem.style.position = "absolute"
					stickyItem.style.top = "auto"
					stickyItem.style.bottom = "0"
				}
				if (scrollItems.getBoundingClientRect().top < 0 && (scrollItems.getBoundingClientRect().bottom - window.innerHeight) > 0) {
					scrollItems.classList.add("extra")
				} else {
					scrollItems.classList.remove("extra")
				}
			})
		}
	}
	fixedItem()
	window.addEventListener("resize", () => fixedItem())
	window.addEventListener("orientationChange", () => fixedItem())
}
const stagesSec = document.querySelector(".stages-sec")
const itemStages = document.querySelectorAll(".item-stage")
if (stagesSec && itemStages.length > 0) {
	let slideCount = itemStages.length
	mm.add("(min-width: 767.98px)", () => {
		let activeIndex = { value: 0 }
		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: stagesSec,
				pin: true,
				scrub: true,
				start: "top 15% center",
				invalidateOnRefresh: true,
				/* end: () => {
					"+=" + stagesSec.querySelector(".stages-sec__items").offsetWidth
				}, */
				end: "+=" + 800 * slideCount,
				onUpdate: (self) => {
					itemStages.forEach(item => item.classList.remove("active"))
					itemStages[Math.round(activeIndex.value)].classList.add("active")
				}
			}
		})
		tl.to(activeIndex, {
			value: slideCount - 1,
			ease: "none"
		})
		tl.to(stagesSec.querySelector(".stages-sec__items"), {
			x: - (stagesSec.querySelector(".stages-sec__items").scrollWidth - stagesSec.querySelector(".stages-sec__items").offsetWidth),
			ease: "none"
		}, 0)
	});
 	itemStages.forEach(item => {
		mm.add("(max-width: 767.98px)", () => {
			gsap.to(item, {
				scrollTrigger: {
					trigger: item,
					scrub: true,
					start: "top 40px top",
					invalidateOnRefresh: true,
					onUpdate: (self) => {
						itemStages.forEach(item => item.classList.remove("active"))
						item.classList.add("active")
					}
				}
			})
		});
	})

}
//intro title animation
const introTitle = document.querySelectorAll(".intro__title svg")
if (introTitle.length) {
	setTimeout(() => {
		introTitle.forEach((title, i) => {
			gsap.fromTo(title.querySelectorAll("path"),
				{
					yPercent: 150, opacity: 0
				},
				{
					yPercent: 0, opacity: 1,
					duration: .4,
					delay: index => index * 0.04 + 0.4 * i
				}
			)
		})
	}, 100);
}
//section title animation
const secTitles = document.querySelectorAll(".sec-title")
if (secTitles) {
	secTitles.forEach(title => {
		let innerMass = title.innerHTML.split(/<br>|\&nbsp;/g)
		title.innerHTML = ""
		let charIndex = 0
		innerMass.forEach(lines => {
			line = lines.split(" ")
			let lineWrapper = document.createElement("span")
			lineWrapper.classList.add("lineWrapper")
			title.append(lineWrapper)
			line.forEach(item => {
				let wordWrapper = item.split(" ")
				wordWrapper.forEach(word => {
					let wordSpan = document.createElement('span')
					wordSpan.classList.add("wordWrapper")
					lineWrapper.append(wordSpan)
					let chars = word.split("")
					chars.forEach(char => {
						let charSpan = document.createElement("span")
						charSpan.innerHTML = char
						charSpan.classList.add("char")
						charSpan.setAttribute("data-i", charIndex)
						charSpan.setAttribute("style", `--char-i: ${charIndex}`)
						wordSpan.append(charSpan)
						charIndex++
					})
				})
			})
		})
		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: title,
				start: "top bottom-=200",
				invalidateOnRefresh: true,
			}
		})
		tl.fromTo(title.querySelectorAll(".char"),
			{
				opacity: 0,
				yPercent: 50,
			},
			{
				yPercent: 0,
				opacity: 1,
				duration: .4,
				delay: index => index * 0.03
				/* duration: .5,
				delay: index => index * 0.05 */
			}
		)
	})
}

// set index to list child elements
const splitList = document.querySelectorAll(".split-list")
if (splitList) {
	splitList.forEach(item => {
		item.querySelectorAll("li").forEach((li, i) => li.style.setProperty('--item-i', i))
		gsap.from(item.querySelector("li"), {
			scrollTrigger: {
				trigger: item,
				start: "top bottom-=200",
				invalidateOnRefresh: true,
				onEnter: () => {
					item.classList.add("animated")
				}
			}
		})
	})
}
const itemProgram = document.querySelectorAll(".item-program")
if (itemProgram) {
	itemProgram.forEach(item => {
		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: item,
				start: "top bottom-=200",
				invalidateOnRefresh: true,
			}
		})
		tl.fromTo(item,
			{
				y: 80,
				opacity: 0.6,
			},
			{
				y: 0,
				opacity: 1,
				duration: 2,
			}
		)
	})
}
//speakers swiper
const speakers = document.querySelector('.speakers')
if (speakers) {
	let speakerSwiper = new Swiper(speakers.querySelector(".swiper"), {
		slidesPerView: "auto",
		spaceBetween: 30,
		observer: true,
		observeParents: true,
		watchSlidesProgress: true,
		navigation: {
			prevEl: speakers.querySelector(".nav-btn--prev"),
			nextEl: speakers.querySelector(".nav-btn--next"),
		},
		breakpoints: {
			992.98: {
				slidesPerView: 3.72,
				spaceBetween: 40,
			},
			767.98: {
				slidesPerView: 3.3,
				spaceBetween: 30,
			},
		},
		speed: 800,
	});
	let tl = gsap.timeline({
		scrollTrigger: {
			trigger: speakers,
			start: "top bottom-=200",
			invalidateOnRefresh: true,
		}
	})
	tl.fromTo(speakers.querySelector(".swiper"),
		{
			xPercent: 20,
			opacity: 0.5
		},
		{
			xPercent: 0,
			duration: 2,
			opacity: 1
		}
	)
}



