import os

root_dir = 'src/main/java/com/ticketmgt'

replacements = {
    'package com.ticketmgt.settings.exception;': 'package com.ticketmgt.shared.exception;',
    'import com.ticketmgt.settings.exception.': 'import com.ticketmgt.shared.exception.',
    'package com.ticketmgt.settings.security;': 'package com.ticketmgt.shared.security;',
    'import com.ticketmgt.settings.security.': 'import com.ticketmgt.shared.security.'
}

for root, _, files in os.walk(root_dir):
    for f_name in files:
        if f_name.endswith('.java'):
            path = os.path.join(root, f_name)
            with open(path, 'r') as f:
                content = f.read()
            changed = False
            for k, v in replacements.items():
                if k in content:
                    content = content.replace(k, v)
                    changed = True
            if changed:
                with open(path, 'w') as f:
                    f.write(content)
