const fadeFn = (set, context) => {
    const {
        mergedEnter,
        mergedExit,
        exitSet,
        completeSet
    } = set;

    if (!mergedEnter.length && !mergedExit.length) {
        context.applyInteractionStyle(completeSet, {}, 'fade', false);
    } else {
        context.applyInteractionStyle(exitSet[1], {}, 'fade', true);
        context.applyInteractionStyle(mergedEnter, {}, 'fade', false);
    }
};

export const strategies = {
    fade: fadeFn,
    focus: (set, context) => {
        const {
            mergedEnter,
            mergedExit,
            completeSet
        } = set;
        if (!mergedEnter.length && !mergedExit.length) {
            context.applyInteractionStyle(completeSet, {}, 'focus', false);
            context.applyInteractionStyle(completeSet, {}, 'focusStroke', false);
        } else {
            context.applyInteractionStyle(mergedExit, {}, 'focus', true);
            context.applyInteractionStyle(mergedEnter, {}, 'focus', false);

            context.applyInteractionStyle(mergedExit, {}, 'focusStroke', false);
            context.applyInteractionStyle(mergedEnter, {}, 'focusStroke', true);
        }
    },
    highlight: (set, context, formattedSet) => {
        const { mergedEnter, mergedExit } = set;
        // Apply highlight on formatted set only
        const { entrySet, exitSet, completeSet } = formattedSet;

        if (!mergedEnter.length && !mergedExit.length) {
            context.applyInteractionStyle(completeSet, {}, 'highlight', false);
        } else {
            context.applyInteractionStyle(entrySet, {}, 'highlight', true);
            context.applyInteractionStyle(exitSet, {}, 'highlight', false);
        }
    }
};
