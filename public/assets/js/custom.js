// Custom JavaScript for Software Crafters Barcelona
(function () {
  'use strict';

  var userManuallySelectedDay = false;

  function getTargetScheduleDay() {
    var hash = window.location.hash;
    var params = new URLSearchParams(window.location.search);

    // 1. Direct tab hash in URL
    if (hash === '#tab-second') return 'saturday';
    if (hash === '#tab-first') return 'friday';

    // 2. Query param (?day=saturday, ?day=friday, etc.)
    var dayParam = (params.get('day') || '').toLowerCase();
    if (dayParam === 'saturday' || dayParam === 'sat' || dayParam === '2') {
      return 'saturday';
    }
    if (dayParam === 'friday' || dayParam === 'fri' || dayParam === '1') {
      return 'friday';
    }

    // 3. Conference event date detection:
    // Friday: 16 October 2026
    // Saturday: 17 October 2026
    // Any other date (e.g. before/after): do nothing, keep Friday default
    var dateOverride = params.get('date');
    var now = dateOverride ? new Date(dateOverride) : new Date();
    var isEventSaturday =
      now.getFullYear() === 2026 &&
      now.getMonth() === 9 &&
      now.getDate() === 17;
    var isEventFriday =
      now.getFullYear() === 2026 &&
      now.getMonth() === 9 &&
      now.getDate() === 16;

    if (isEventSaturday) {
      return 'saturday';
    } else if (isEventFriday) {
      return 'friday';
    }

    return null;
  }

  function activateScheduleTab(day) {
    if (!day) return;

    var targetSelector = day === 'saturday' ? '#tab-second' : '#tab-first';
    var $tabLink = jQuery('#tabs-lv1 a[href="' + targetSelector + '"]');

    if ($tabLink.length) {
      if (typeof $tabLink.tab === 'function') {
        $tabLink.tab('show');
      } else {
        $tabLink.parent().addClass('active').siblings().removeClass('active');
        jQuery('.tab-content.lv1 > .tab-pane').removeClass('active in');
        jQuery(targetSelector).addClass('active in');
      }
    }
  }

  function initSchedule() {
    var $tabs = jQuery('#tabs-lv1');
    if (!$tabs.length) return;

    // Track if attendee clicks a tab manually
    $tabs.on('click', 'a[data-toggle="tab"]', function () {
      userManuallySelectedDay = true;
    });

    // Auto-select schedule day based on current day or URL
    var targetDay = getTargetScheduleDay();
    if (targetDay) {
      activateScheduleTab(targetDay);
    }

    // When clicking any link pointing to #schedule (e.g. navbar "Schedule")
    jQuery('a[href="#schedule"]').on('click', function () {
      if (!userManuallySelectedDay) {
        var day = getTargetScheduleDay();
        if (day) {
          activateScheduleTab(day);
        }
      }
    });
  }

  // Handle hash changes
  if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', function () {
      var hash = window.location.hash;
      if (hash === '#tab-second') {
        activateScheduleTab('saturday');
      } else if (hash === '#tab-first') {
        activateScheduleTab('friday');
      } else if (hash === '#schedule' && !userManuallySelectedDay) {
        var day = getTargetScheduleDay();
        if (day) {
          activateScheduleTab(day);
        }
      }
    });
  }

  // Initialize with jQuery when ready
  if (typeof jQuery !== 'undefined') {
    jQuery(document).ready(initSchedule);
  } else {
    document.addEventListener('DOMContentLoaded', initSchedule);
  }
})();
