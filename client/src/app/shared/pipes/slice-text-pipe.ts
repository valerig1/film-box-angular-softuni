import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: 'sliceText'
})

export class SliceTextPipe implements PipeTransform {
	transform(value: string, maxLenght: number = 50): string {
		if (!value) {
			return '';
		}

		return value.length > maxLenght ? value.slice(0, maxLenght) + '...' : value;
	}
}