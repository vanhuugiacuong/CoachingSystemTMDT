/**
 * Module tính ưu đãi khóa học
 * - Ưu đãi khóa đầu: giảm % cho khóa học đầu tiên (chưa đăng ký khóa nào).
 * - Combo Full Stack: giảm % khi đăng ký thêm khóa trong nhóm Full Stack (đã có ít nhất 1 khóa Full Stack).
 */

/** ID các khóa thuộc lộ trình Full Stack (frontend + backend + DB + tool) */
export const FULL_STACK_COURSE_IDS = [
  "git-foundation",
  "nextjs-15-beginner",
  "nestjs-basic",
  "db-data-engineering",
];

/** Giảm % cho khóa học đầu tiên */
export const FIRST_COURSE_DISCOUNT_PERCENT = 10;

/** Giảm % cho mỗi khóa trong nhóm Full Stack khi đã có ít nhất 1 khóa Full Stack */
export const FULL_STACK_DISCOUNT_PERCENT = 15;

/**
 * Kiểm tra khóa có thuộc nhóm Full Stack không
 * @param {string} courseId
 * @returns {boolean}
 */
export function isFullStackCourse(courseId) {
  return FULL_STACK_COURSE_IDS.includes(courseId);
}

/**
 * Đếm số khóa Full Stack trong danh sách đã đăng ký (trừ khóa hiện tại)
 * @param {string[]} registeredCourseIds
 * @param {string} [excludeCourseId]
 * @returns {number}
 */
export function countFullStackRegistered(registeredCourseIds, excludeCourseId) {
  return registeredCourseIds.filter(
    (id) => id !== excludeCourseId && isFullStackCourse(id)
  ).length;
}

/**
 * Lấy danh sách ưu đãi áp dụng cho một khóa (không tính giá)
 * @param {string} courseId
 * @param {string[]} registeredCourseIds - ID các khóa đã đăng ký
 * @returns {{ id: string, label: string, percent: number }[]}
 */
export function getApplicablePromotions(courseId, registeredCourseIds = []) {
  const list = [];
  const registered = Array.isArray(registeredCourseIds) ? registeredCourseIds : [];

  // Ưu đãi khóa đầu: chưa đăng ký khóa nào
  if (registered.length === 0) {
    list.push({
      id: "first_course",
      label: "Ưu đãi khóa học đầu tiên",
      percent: FIRST_COURSE_DISCOUNT_PERCENT,
    });
    return list;
  }

  // Combo Full Stack: khóa này thuộc Full Stack và đã có ít nhất 1 khóa Full Stack khác
  if (isFullStackCourse(courseId)) {
    const otherFullStackCount = countFullStackRegistered(registered, courseId);
    if (otherFullStackCount >= 1) {
      list.push({
        id: "fullstack_bundle",
        label: "Ưu đãi combo Full Stack",
        percent: FULL_STACK_DISCOUNT_PERCENT,
      });
    }
  }

  return list;
}

/**
 * Tính giá cuối cùng sau ưu đãi (chỉ áp dụng 1 ưu đãi có % cao nhất)
 * @param {string} courseId
 * @param {number} basePrice - giá gốc
 * @param {string[]} [registeredCourseIds]
 * @returns {{ finalPrice: number, applied: { id: string, label: string, percent: number } | null, discountAmount: number }}
 */
export function calculateFinalPrice(courseId, basePrice, registeredCourseIds = []) {
  const promotions = getApplicablePromotions(courseId, registeredCourseIds);
  if (promotions.length === 0) {
    return {
      finalPrice: basePrice,
      applied: null,
      discountAmount: 0,
    };
  }
  // Áp dụng ưu đãi có % cao nhất
  const best = promotions.reduce((a, b) => (a.percent >= b.percent ? a : b));
  const discountAmount = Math.round((basePrice * best.percent) / 100);
  const finalPrice = Math.max(0, basePrice - discountAmount);
  return {
    finalPrice,
    applied: best,
    discountAmount,
  };
}
