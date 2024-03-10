import {PaginationOptions} from "../types/PaginationOptions.ts";
import {onMounted, ref, watch} from "vue";

export default function usePagination(cookieKey: string, defaultPerPage: string = '25') {
    const options = ref<PaginationOptions>({
        perPage: '25',
        page: 1,
        search: ''
    });

    const perPageOptions = ['10', '25', '50', '100', '500'];

    onMounted(() => {
        options.value.perPage = JSON.parse(localStorage.getItem(`${cookieKey}.perPage`) ?? defaultPerPage);
    });

    watch(() => options.value.perPage,async (newVal) => {
        localStorage.setItem(`${cookieKey}.perPage`, JSON.stringify(newVal));
    }, {immediate: false});


    watch(() => [options.value.search, options.value.perPage], () => {
        options.value.page = 1;
    }, {immediate: false});

    return {options, perPageOptions };
}