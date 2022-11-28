// copy-paste from '@left4code/tw-starter/dist/js/tab'
// improved tab content width calculation, which did not account for border width
import dom from '@left4code/tw-starter/dist/js/dom'
;(function (dom) {
  'use strict'

  // Show tab content
  dom('body').on('click', "[role='tab']", function () {
    show(this)
  })

  function show(el) {
    dom(el)
      .closest("[role='tablist']")
      .find("[role='tab']")
      .each(function () {
        // Trigger "hide.tw.tab" callback function
        if (dom(this).hasClass('active') && this !== el) {
          const event = new Event('hide.tw.tab')
          dom(this)[0].dispatchEvent(event)
        }

        // Trigger "show.tw.tab" callback function
        if (!dom(this).hasClass('active') && this === el) {
          const event = new Event('show.tw.tab')
          dom(this)[0].dispatchEvent(event)
        }
      })

    // Set active tab nav
    dom(el)
      .closest("[role='tablist']")
      .find("[role='tab']")
      .removeClass('active')
      .attr('aria-selected', false)
    dom(el).addClass('active').attr('aria-selected', true)

    // Set active tab content
    let elementId = dom(el).attr('data-tw-target')
    let tabContent = dom(elementId).closest('.tab-content')
    let tabContentWidth = tabContent.width()

    if (tabContent[0]) {
      let computedStyle = window.getComputedStyle(tabContent[0])

      if (
        (computedStyle && computedStyle.borderLeftWidth) ||
        computedStyle.borderRightWidth
      ) {
        tabContentWidth += computedStyle.borderLeftWidth
        tabContentWidth += computedStyle.borderRightWidth
      }
    }

    dom(elementId)
      .closest('.tab-content')
      .children('.tab-pane')
      .removeAttr('style')
      .removeClass('active')
    dom(elementId)
      .css('width', tabContentWidth + 'px')
      .addClass('active')
  }

  // Create instance
  function createInstance(el) {
    return {
      show() {
        show(el)
      },
    }
  }

  // Register instance
  ;(function init() {
    dom("[role='tab']").each(function () {
      this['__tab'] = createInstance(this)
    })

    if (window.tailwind === undefined) window.tailwind = {}
    window.tailwind.Tab = {
      getInstance(el) {
        return el.__tab
      },
      getOrCreateInstance(el) {
        return el.__tab === undefined ? createInstance(el) : el.__tab
      },
    }
  })()
})(dom)
