// Admin Dashboard JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Sidebar toggle functionality
  const sidebarToggle = document.getElementById("sidebarToggle")
  const mobileMenuToggle = document.getElementById("mobileMenuToggle")
  const sidebar = document.getElementById("sidebar")

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed")
    })
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("mobile-open")
    })
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        sidebar.classList.remove("mobile-open")
      }
    }
  })

  // Table row selection
  const selectAllCheckbox = document.querySelector(".select-all")
  const rowCheckboxes = document.querySelectorAll(".row-select")

  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener("change", function () {
      rowCheckboxes.forEach((checkbox) => {
        checkbox.checked = this.checked
      })
    })
  }

  // Individual row selection
  rowCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const checkedCount = document.querySelectorAll(".row-select:checked").length
      const totalCount = rowCheckboxes.length

      if (selectAllCheckbox) {
        selectAllCheckbox.checked = checkedCount === totalCount
        selectAllCheckbox.indeterminate = checkedCount > 0 && checkedCount < totalCount
      }
    })
  })

  // Status badge interactions
  document.querySelectorAll(".status-badge").forEach((badge) => {
    badge.addEventListener("click", function () {
      // Add status change functionality here
      console.log("Status clicked:", this.textContent)
    })
  })

  // Action button handlers
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      const action = this.getAttribute("title") || this.textContent.trim()

      switch (action.toLowerCase()) {
        case "approve":
          handleApprove(this)
          break
        case "reject":
          handleReject(this)
          break
        case "view":
          handleView(this)
          break
        case "edit":
          handleEdit(this)
          break
      }
    })
  })

  // Filter functionality
  const filterSelects = document.querySelectorAll(".form-select")
  filterSelects.forEach((select) => {
    select.addEventListener("change", () => {
      applyFilters()
    })
  })

  // Search functionality
  const searchInput = document.querySelector(".search-input")
  if (searchInput) {
    searchInput.addEventListener(
      "input",
      debounce(function () {
        performSearch(this.value)
      }, 300),
    )
  }
})

// Action handlers
function handleApprove(button) {
  const row = button.closest("tr")
  const propertyId = row.querySelector("td:first-child").textContent

  if (confirm(`Are you sure you want to approve property ${propertyId}?`)) {
    // Update status badge
    const statusBadge = row.querySelector(".status-badge")
    statusBadge.textContent = "Approved"
    statusBadge.className = "status-badge approved"

    // Update action buttons
    const actionButtons = row.querySelector(".action-buttons")
    actionButtons.innerHTML = `
            <button class="btn btn-sm btn-primary" title="View">
                <i class="fas fa-eye"></i>
            </button>
            <button class="btn btn-sm btn-secondary" title="Edit">
                <i class="fas fa-edit"></i>
            </button>
        `

    showNotification("Property approved successfully!", "success")
  }
}

function handleReject(button) {
  const row = button.closest("tr")
  const propertyId = row.querySelector("td:first-child").textContent

  if (confirm(`Are you sure you want to reject property ${propertyId}?`)) {
    const statusBadge = row.querySelector(".status-badge")
    statusBadge.textContent = "Rejected"
    statusBadge.className = "status-badge rejected"

    showNotification("Property rejected successfully!", "warning")
  }
}

function handleView(button) {
  const row = button.closest("tr")
  const propertyId = row.querySelector("td:first-child").textContent

  // Open property details modal or navigate to details page
  console.log("Viewing property:", propertyId)
  showNotification("Opening property details...", "info")
}

function handleEdit(button) {
  const row = button.closest("tr")
  const propertyId = row.querySelector("td:first-child").textContent

  // Navigate to edit page or open edit modal
  console.log("Editing property:", propertyId)
  showNotification("Opening property editor...", "info")
}

// Filter functionality
function applyFilters() {
  const filters = {}
  document.querySelectorAll(".form-select").forEach((select) => {
    if (select.value) {
      filters[select.name || "filter"] = select.value
    }
  })

  console.log("Applying filters:", filters)
  // Implement actual filtering logic here
}

// Search functionality
function performSearch(query) {
  console.log("Searching for:", query)
  // Implement search logic here
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message

  // Style the notification
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "1rem 1.5rem",
    borderRadius: "0.5rem",
    color: "white",
    fontWeight: "500",
    zIndex: "9999",
    opacity: "0",
    transform: "translateY(-20px)",
    transition: "all 0.3s ease",
  })

  // Set background color based on type
  const colors = {
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  }
  notification.style.backgroundColor = colors[type] || colors.info

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.opacity = "1"
    notification.style.transform = "translateY(0)"
  }, 100)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = "0"
    notification.style.transform = "translateY(-20px)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Initialize tooltips and other UI enhancements
function initializeUI() {
  // Add hover effects to cards
  document.querySelectorAll(".stat-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
      this.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
      this.style.boxShadow = "none"
    })
  })
}

// Call initialization
initializeUI()
