import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'HTMLCHAR'
})
export class HTMLCHARPipe implements PipeTransform {

  transform(value: string): string {
     var map = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#039;'
        };

        return value.replace(/[&<>"']/g, function(m) { return map[m]; });
  }

}
